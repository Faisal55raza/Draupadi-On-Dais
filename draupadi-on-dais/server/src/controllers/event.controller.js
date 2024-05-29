import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import { Event } from "../models/event.model.js"
import { uploadOnCloudinary } from "../utils/Cloudinary.js"

const options = {
    httpOnly: true,
    secure: true
}


const createEvent = asyncHandler( async (req, res) => {
    try {
        // const eventPoster = req?.file?.path || ""
        
        // if(eventPoster) {
        //     const poster = await uploadOnCloudinary(eventPoster)
            
        //     if(!poster.url){
        //         throw new ApiError(500, "Something went wrong while uploading event poster")
        //     }
            
        //     if(req.body) {
        //         req.body.poster = poster.url;
        //     }
        // }
        // req.body.user = req.user._id;
        req.body.user = req.user._id
        console.log("Enter here,", req.body)

        const event = await Event.create(req.body);
        
        res
        .status(200)
        .json(
            new ApiResponse(200, event, "Event created successfully")
        )

    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating event")  
    }

})
const getAllEvents = asyncHandler( async (req, res) => {
    try {
        
        const events = await Event.find();
        
        res
        .status(200)
        .json(
            new ApiResponse(200, events, "Event data fetched successfully")
        )

    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching events.")  
    }

})
const getSingleEvent = asyncHandler( async (req, res) => {
    try {
        
        const event = await Event.findById(req.params.id).populate("user","name email organisation phoneNo");

        res
        .status(200)
        .json(
            new ApiResponse(200, event, "Event data fetched successfully")
        )

    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching event.")  
    }

})

const deleteEvent = asyncHandler( async (req, res) => {
    try {
        
        const event = await Event.findById(req.params.id)
        if(!event){
            throw new ApiError(401, "Event not exist with given id.")
        }

        if(req.user._id != event.user){
            throw new ApiError(401, "Not allowed to delete this event.")
        }

        res
        .status(200)
        .json(
            new ApiResponse(200, "Event deleted successfully")
        )

    } catch (error) {
        throw new ApiError(500, "Something went wrong while deleting event.")  
    }

})

const myEvents = asyncHandler( async (req, res) => {
    try {
        
        const events = await Event.find({user: req?.user._id});
        if(!events) {
            throw new ApiError(500, "Something went wrong while fetching current user events.")
        }
        
        res
        .status(200)
        .json(
            new ApiResponse(200, events, "Event data fetched successfully")
        )

    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching  user events.")  
    }

})



export {
    createEvent,
    getAllEvents,
    getSingleEvent,
    deleteEvent,
    myEvents
}