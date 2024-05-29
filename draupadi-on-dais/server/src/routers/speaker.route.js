import { Router } from "express";
import { 
    getAllSpeakers,
    createSpeaker,
    getSpeakerDetails,
} from "../controllers/speaker.controller.js";

// import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

// router.route("/logout").post(verifyJWT, logoutUser)
router.route("/speakers").get(getAllSpeakers)
router.route("/create").post( verifyJWT, createSpeaker);
router.route("/speaker/:id").get(getSpeakerDetails);


export default router