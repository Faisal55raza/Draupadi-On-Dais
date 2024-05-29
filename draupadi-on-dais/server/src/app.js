import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {upload} from "./middlewares/multer.middleware.js"
import dotenv from "dotenv";

const app  = express(); 

// dotenv.config({
//     path: "./.env"
// })b

// app.use(cors({
//     // origin: "http://localhost:5173/",
//     origin: process.env.ORIGIN_URL,
//     credentials: false
// }))

app.use(cors())



app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true, limits: "16kb"}))
app.use(express.static("public"))

// import router
import userRouter from "./routers/user.router.js"
import speakerRouter from "./routers/speaker.route.js"
import eventRouter from "./routers/event.route.js"
import chatRouter from "./routers/chat.route.js"

// use router
app.use("/api/v1/users", userRouter)
app.use("/api/v1/speaker", speakerRouter)
app.use("/api/v1/event", eventRouter)
app.use("/api/v1/chat", chatRouter)

app.get("/", (req, res) => {
    console.log("Hello World");
    res
    .status(200)
    .json({
        message: "Hello World"
    });
    console.log("Hello done");
});


export default app;