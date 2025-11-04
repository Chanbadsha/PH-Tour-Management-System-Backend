import { Server } from "http";
import app from "./app";
import { connectDB } from "./app/config/db.config";

let server: Server;
const PORT = process.env.PORT || 4000;

const startServer = async (): Promise<void> => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Start Express server
        server = app.listen(PORT, () => {
            console.log(`✅ PH Tour Management Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Failed to start the server:", (error as Error).message);
        process.exit(1);
    }
};

startServer();
