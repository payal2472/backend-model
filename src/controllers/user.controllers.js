import {asyncHandler} from '../utils/asyncHandler.js';
import { ApiError } from "../utils/apiError.js";
import {User} from '../models/user.model.js';
import {ApiResponse} from '../utils/ApiResponse.js';

const generateAccessAndRefereshTokens = async(userId) => {
     try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        
        user.refreshToken = refreshToken;
        await user.save({validationbeforeSave: false})

        return {accessToken, refreshToken};

     } catch (error) {
        throw new ApiError (500, "somthing went wrong, unable to generate tokens")
        
     }
}

const registerUser = asyncHandler(async (req, res) => {
    
    //get user details from frontend
    //validation - not empty 
    //check if user already exists username or email 
    //check for images ,check for avatar
    //upload images to cloudinary, check avatar
    //create user in object: create entry in database
    //remove password and refresh token field from response
    //check for youser creation
    // return response
    // res.status(201).json({ message: 'User registered successfully' });

    const {fullName, username, email, password} = req.body;
     
    if ([fullName, username, email, password].some((field) => field?.trim()=== "")) 
    
    {
         throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or:[{username}, {email}]
    })

    if (existedUser) {
        throw new ApiError(409, "Username or email already exists");
    }


     const user = await User.create ({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken"); 
    if (!createdUser) {
        throw new ApiError(500, "something went wrong, user not created");
        
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully..."));
        
});

const loginUser = asyncHandler(async (req, res) => {
    // request body - data le ao
    //username or email
    // find the  user exists
    //password check
    //access ND refresh token generate
    //send cookies

    const {email, username, password} = req.body
    if (!(username || email) ) {
        throw new ApiError(400, "username or email are required")
        
    }
    const user= await User.findOne({
        $or : [{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid){
        throw new ApiError(401, "Invalid password")
    }
    const {accessToken, referehToken} = await generateAccessAndRefereshTokens(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", referehToken, options)
    .json(
        new ApiResponse(200,
            { 
              user: loggedInUser, accessToken, referehToken  
            },
            "User logged in successfully..."
        )
    )
})

const logoutUser = asyncHandler(async (req, res) => {
    //clear cookies
    //remove refresh token from user
    //send response 



    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken: 1, //this will remove the refreshToken field from the document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})


export {registerUser, loginUser, logoutUser}