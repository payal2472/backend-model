import asyncHandler from '../utils/asyncHandler.js';
import apiError from '../utils/apiError.js';
import {User} from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';

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
         throw new apiError(400, "All fields are required");
    }

    const existedUser = User.findOne({
        $or:[{username}, {email}]
    })

    if (existedUser) {
        throw new apiError(409, "Username or email already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new apiError(400, "Avatar and cover image are required");
        
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
     

   
});

export {registerUser}; 