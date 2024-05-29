import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"

import { uploadOnCloudinary } from "../utils/Cloudinary.js"
import { User } from "../models/user.model.js"

const options = {
    httpOnly: true,
    secure: true
}

const getMessages = asyncHandler( async (req, res) => {
    try {
        // console.log("Enter in get messages")
        const messages = await User.findById(req.user._id).select("messages");
        
        res
        .status(200)
        .json(
            new ApiResponse(200, messages, "Event data fetched successfully")
        )

    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching events.")  
    }

})


const postMessage = asyncHandler( async (req, res) => {
    try {
        
    const userId = req.user._id;
    const message = req.body; // Extract message from request body
//    console.log(message)
    if (!message) {
      return res.status(400).json({ message: 'Missing message content' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // console.log(message)
    user.messages.push(message ); // Add message object to messages array
    
    await user.save(); // Save the updated user

    res
    .status(200)
    .json(
        new ApiResponse(200, "Message set successfully")
    )

    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching  user events.")  
    }

})



export {
    getMessages,
    postMessage
}