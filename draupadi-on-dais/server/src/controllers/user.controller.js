import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import jwt from "jsonwebtoken"

const options = {
    httpOnly: true,
    secure: true
}

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save( { validation: false } )

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens")
    }
}

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar

    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const { fullName, username, password, email } = req.body
    if( [ fullName, username, password, email ].some( (field) => field?.trim() === "") ){
        throw new ApiError(400, "All fields required")
    }

    const existUser = await User.findOne({ $or: [ {email}, {username}] })
    if(existUser){
        throw new ApiError(409, "User with email and username already exits")
    }

    // const avatarLocalPath = req.files?.avatar[0]?.path
    // console.log(avatarLocalPath)
    // let coverImageLocalPath;

    // if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0 ){
    //     coverImageLocalPath = req.files.coverImage[0].path
    // }

    // if(!avatarLocalPath){
    //     throw new ApiError( 406,"Avatar local is required." )
    // }
    // console.log(avatarLocalPath, coverImageLocalPath)

    // const avatar = await uploadOnCloudinary(avatarLocalPath)
    // const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    // if(!avatar){
    //     throw new ApiError(400, "Avtar is required")
    // }

    const user = await User.create({
        fullName,
        password,
        email,
        avatar: "",
        coverImage: "",
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registeration")
    }

    res.status(201).json(
        new ApiResponse(201, createdUser, "User registered Successfully")
    )

})

const loginUser = asyncHandler( async (req, res) => {
 
    let { username, email , password } = req.body
    if( !username || !email ){
        throw new ApiError(400, "All fields required")
    }

    const user = await User.findOne({ $or: [ {email}, {username}] })
  
    if(!user){
        throw new ApiError(404, "User not found")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if(!isPasswordCorrect){
        throw new ApiError(401, "Invalid credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    // const response = await User.findById(user._id).select("-password -refreshToken")
    let response = await User.findById(user._id).select("-password ");
    response.refreshToken = accessToken;

    res
    .status(200)
    .setHeader('Authorization', `Bearer ${accessToken}`)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
        new ApiResponse(200, response, "User logged in successfully")
    )
})

const logoutUser = asyncHandler(async(req, res) => {

    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1
                }
            },
            {new: true}
        )
    } catch (error) {
        throw new ApiError(500, "Something went wrong while logging out")
    }

    res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(
        new ApiResponse(200, null, "User logged out successfully")
    )
})

const getcurrentUser = asyncHandler(async(req, res) => {
    try {
        res
        .status(200)
        .json(
            new ApiResponse(200, req.user, "Current user fetched successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Something went wrong while getting current user")  
    }
})

const refreshAccessToken = asyncHandler(async(req, res) => {
    try {

        const incommingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken
        if(!incommingRefreshToken){
            throw new ApiError(401, "Refresh token is required")
        }
        try {
            const decodedToken = jwt.verify(incommingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
            if(!decodedToken){
                throw new ApiError(401, "Invalid refresh token")
            }
            
            
            const user = await User.findById(decodedToken?._id).select("-password")
            // const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
            
            if(!user){
                throw new ApiError(404, "User not found")
            }
            
            if(user.refreshToken !== incommingRefreshToken){
                console.log("I am here")
                throw new ApiError(401, "Invalid refresh token")
            }
            
            const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
            
            res
            .status(200)
            .cookie("refreshToken", refreshToken, options)
            .cookie("accessToken", accessToken, options)
            .json(
                new ApiResponse(200,{ accessToken, refreshToken }, "Access token refreshed successfully")
            )
        } catch (error) {
            throw new ApiError(500, "Something went wrong while refreshing access token")
        }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while refreshing access token")
    }
})

const changePassword = asyncHandler(async(req, res) => {
    try {
        const { oldPassword, newPassword } = req.body
        if(!oldPassword || !newPassword){
            throw new ApiError(400, "All fields required")
        }

        const user = await User.findById(req.user._id)
        if(!user){
            throw new ApiError(404, "User not found")
        }

        const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
        if(!isPasswordCorrect){
            throw new ApiError(401, "Invalid credentials")
        }

        user.password = newPassword
        await user.save({ validation: false })

        res.status(200).json(
            new ApiResponse(200, null, "Password changed successfully")
        
        )

    } catch (error) {
        throw new ApiError(500, "Something went wrong while changing password")
    }
})

const updateAccountDetails = asyncHandler(async(req, res) => {
    const {fullName, email, organisation, industry, twitter, linkedIn, instagram, website, phoneNo } = req.body

    if (!fullName || !email ) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email,
                organisation,
                industry,
                twitter,
                linkedIn,
                instagram,
                website,
                phoneNo
            }
        },
        {new: true}
        
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
});

const updateAvatar = asyncHandler(async(req, res) => {
    const avatarLocalPath = req.file?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if(!avatar.url){
        throw new ApiError(500, "Something went wrong while uploading avatar")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar updated successfully"))
});

const updateCoverImage = asyncHandler(async(req, res) => {
    const coverImageLocalPath = req.file?.path

    if(!coverImageLocalPath){
        throw new ApiError(400, "Cover image is required")
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(!coverImage.url){
        throw new ApiError(500, "Something went wrong while uploading cover image")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: coverImage.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Cover image updated successfully"))
});



export {
    registerUser,
    loginUser,
    logoutUser,
    getcurrentUser,
    refreshAccessToken,
    changePassword,
    updateAccountDetails,
    updateAvatar,
    updateCoverImage,
}