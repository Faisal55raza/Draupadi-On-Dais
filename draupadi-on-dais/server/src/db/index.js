import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = ( async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`,
            {
                // useNewUrlParser: true,
                // useUnifiedTopology: true,
                writeConcern: {
                w: 'majority',
                j: true,
                },
            }
        )
        console.log("Connected to the database");
        return connectionInstance;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})

export default connectDB;

