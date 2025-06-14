
import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { ApiError } from "../utils/apiError";



export const verifyJWT = asyncHandler(async (req, res, next) =>{
    const token = req.cookies?.accessToken || req.header
    ("authorization")?.replace("Bearer ", "") 

    if (!token) {
        throw new ApiError(401, "Access token is required for authentication");
    }
    
    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
    await User.findById(decodedToken.id)
})