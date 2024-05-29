import { Router } from "express";

import { 
    createEvent,
    getAllEvents,
    getSingleEvent,
    deleteEvent,
    myEvents
} from "../controllers/event.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

// router.route("/new").post( verifyJWT, upload.single("poster"), createEvent);
router.route("/new").post( verifyJWT,  createEvent);
router.route("/events").get( getAllEvents);
router.route("/event/:id").get( getSingleEvent);
router.route("/myevents").get( verifyJWT, myEvents);
// router.route("/event/:id").get( verifyJWT, getSingleEvent).delete( verifyJWT,deleteEvent);
// router.route("/delete-event/:id").get( verifyJWT, deleteEvent)


export default router