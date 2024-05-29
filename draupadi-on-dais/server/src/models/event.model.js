import mongoose, {Schema} from "mongoose";

const eventSchema = new Schema({
    user:{
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true,
    },
    poster: {
        type: String,
    },
    name : {
        type: String,
        required: [true, "Please enter event Name"],
    },
    organisation : {
        type: String,
        required: [true, "Please enter event organisation"],
    },
    state : {
        type: String,
        required: true,
    },
    venue : {
        type : String,
        required: [true, "Please enter venue"]
    },
    footfall:{
        type: String,
        required: [true, "Please enter FootFall"],
    },
    type : {
        type: String,
        required: [true, "Please enter event type"]
    },
    date: {
        type: Date,
        required: true,
    },
    details: {
        type: String,
        required: [true, "Please enter event Details"]
    }
});

export const Event = mongoose.model("Event",eventSchema);
