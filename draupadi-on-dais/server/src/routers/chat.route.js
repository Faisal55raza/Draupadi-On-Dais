import { Router } from "express";

import { 
    getMessages,
    postMessage
} from "../controllers/chat.controller.js";

// import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/allmessages").get(verifyJWT, getMessages);
router.route("/postmessage").post(verifyJWT, postMessage);




export default router