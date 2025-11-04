/* eslint-disable no-console */
import mongoose from "mongoose";
import { envVars } from "./envVar";

export const connectDB = async (): Promise<void> => {
    try {

        // const options: mongoose.ConnectOptions = {

        //   autoIndex: true,
        //   maxPoolSize: 10,
        //   serverSelectionTimeoutMS: 5000,
        //   socketTimeoutMS: 45000,
        // };

        // await mongoose.connect(uri, options);


        await mongoose.connect(envVars.DB_URL);

        // await mongoose.connect(`mongodb+srv://nextLevelUser:nextLevelUser@cluster0.t47d6.mongodb.net/PH_TOUR_MANAGMENT?appName=Cluster0`)
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", (error as Error).message);
        process.exit(1);
    }
};
