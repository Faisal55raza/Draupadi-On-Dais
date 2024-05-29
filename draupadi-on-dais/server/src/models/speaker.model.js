import mongoose, { Schema } from "mongoose";

const speakerSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        bio: {
            type: String,
            required: [true, "Please enter your Bio"],
        },
        education: {
            type: Object,
            degree: {
                type: String,
                required: [true, "Please enter your degree"],
            },
            field: {
                type: String,
                required: [true, "Please enter degree field"],
            },
            college: {
                type: String,
                required: [true, "Please enter your College"],
            },
            
        },
        experience: {
            type: String,
            required: [true, "Please enter your Experience"],
        },
    }
);

export const Speaker = mongoose.model("Speaker", speakerSchema);
