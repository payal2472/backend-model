import asyncHandler from '../utils/asyncHandler.js';

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

    const {fullName, username, email, password, avatar } = req.body;
    console.log("email", email);   



     
});

export {registerUser}; 