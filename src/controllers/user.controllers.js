import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from "../utils/apiError.js";
import {User} from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/ApiResponse.js';

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
    console.log("email", email);   
     
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



    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath || !coverImageLocalPath) {
        throw new ApiError(400, "Avatar and cover image are required");
        
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
         throw new ApiError(400, "Avatar file is required");
        
    }
     const user = await User.create ({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar?.secure_url, // Use the secure URL from Cloudinary
        coverImage: coverImage?.url || "", // Use the secure URL from Cloudinary
        
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken"); 
    if (!createdUser) {
        throw new ApiError(500, "something went wrong, user not created");
        
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully"));
     

   
});

export {registerUser}; 