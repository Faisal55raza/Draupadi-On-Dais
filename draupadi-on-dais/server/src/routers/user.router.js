import { Router } from "express";
import { 
    registerUser,
    loginUser,
    logoutUser,
    getcurrentUser,
    refreshAccessToken,
    changePassword,
    updateAccountDetails,
    updateAvatar,
    updateCoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { get } from "mongoose";


const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/current-user").get(verifyJWT, getcurrentUser)
router.route("/refresh-access-token").post(verifyJWT, refreshAccessToken)
router.route("/change-password").put(verifyJWT, changePassword)
router.route("/update-account-details").put(verifyJWT, updateAccountDetails)

router.route("/update-avatar").put(verifyJWT, upload.single("avatar"), updateAvatar)
router.route("/cover-image").put(verifyJWT, upload.single("coverImage"), updateCoverImage)
// router.route("/delete-avatar").delete(verifyJWT, updateAccountDetails)



export default router