import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import {Speaker} from "../models/speaker.model.js"
import { User } from "../models/user.model.js"

const options = {
    httpOnly: true,
    secure: true
}

const getAllSpeakers = asyncHandler( async (req, res) => {
    try {
        const speakersData = await Speaker.find().populate("user");
        // const speakersData = await Speaker.aggregate([
        //     {
        //       $lookup: {
        //         from: "user", 
        //         localField: "_id",
        //         foreignField: "user", 
        //         as: "userData",
        //       },
        //     },
        //     // {
        //     //   $unwind: "$userData" // Deconstruct the array to a single user object (optional)
        //     // },
        //     {
        //       $project: {
               
        //         speakerFields: "$$ROOT", // Include all remaining Speaker fields
        //         user: {
        //           _id: "$userData._id", // Include specific User fields
        //           name: "$userData.name",
        //           email: "$userData.email", // Add other user fields you need
        //         },
        //       },
        //     },
        
        //   ]);

        console.log(speakersData)
        
        res
        .status(200)
        .json(
            new ApiResponse(200, speakersData, "Speakers data fetched successfully")
        )

    } catch (error) {
        throw new ApiError(500, "Something went wrong while getting speakers details")  
    }

})

const getSpeakerDetails = asyncHandler( async (req, res) => {
    try {
        
        const speakerId = req.params.id;
        
        if(!speakerId){
            throw new ApiError(400, "Speaker Id required")
        }
        
        const speakerDetails = await Speaker.findById(speakerId).populate("user")
        console.log(speakerDetails)

        if(!speakerDetails){
            throw new ApiError(404, "Speaker with given Id not found")
        }

        res
        .status(200)
        .json(
            new ApiResponse(200, speakerDetails, "Speakers data fetched successfully")
        )

    } catch (error) {
        throw new ApiError(500, "Something went wrong while getting speakers details with given speaker id.")  
    }

})

const createSpeaker = asyncHandler( async (req, res) => {
    try {
        console.log("Calling create speaker")
        const userId = req.user._id;
        const userDetails = await User.findById(userId);

        if(!userDetails){
            throw new ApiError(400, "User not exit.");
        }
        // console.log(userDetails)
        if(userDetails.role == "speaker") {
            throw new ApiError(400, "User is already a speaker.")
        }
        
        if(!userId && !bio && !education && experience ) {
            throw new ApiError(400, "All field must be filled")
        }
        
        console.log("enter here", req.body)
        let obj = req.body;
        obj.user = userDetails._id

        const savedSpeaker = await Speaker.create(obj);

        if(!savedSpeaker) {
            throw new ApiError(500, "Something went wrong while creating speaker");
        }

        await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    role: "speaker"
                }
            },
            {new: true}
            
        )

        res
        .status(200)
        .json(
            new ApiResponse(200,savedSpeaker, "Speakers data fetched successfully")
        )

    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating speakers")  
    }

})



export {
    getAllSpeakers,
    createSpeaker,
    getSpeakerDetails
}