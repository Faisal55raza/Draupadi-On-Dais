import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js";


const verifyJWT = asyncHandler( async (req, res, next) => {
    // get token from header or cookie
    // check if token exists
    // verify token
    // return next

    try {
        
        console.log("enter")
        const token = req.header("Authorization")?.replace("Bearer", "").trim() || req.cookies?.accessToken || null;
    
        if(!token){
            throw new ApiError(401, "Unauthorized token not found")
        }
    
        const decodedToken = await jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)

        if(!decodedToken){
            throw new ApiError(401, "Unauthorized token not verified")
        }
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            throw new ApiError(401, "Invalid token user not found")
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, "Failed jwt verification token not verified")
    }
})

export { verifyJWT }