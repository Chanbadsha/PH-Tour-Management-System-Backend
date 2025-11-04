import { Server } from "http";
import app from "./app";
import { connectDB } from "./app/config/db.config";

let server: Server;
const PORT = process.env.PORT || 4000;

// Start The Server
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

/**
 * Gracefully shuts down the server and exits the process.
 */
const gracefulShutdown = (reason: string, error?: unknown) => {
    console.error(`\n🛑 ${reason}`);
    if (error) console.error("Error details:", error);

    if (server) {
        server.close(() => {
            console.log("🚪 Server closed gracefully.");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

//  Start the server
startServer();

// 🧩 Global Error Handlers

// Unhandled Promise Rejection
process.on("unhandledRejection", (error) => {
    gracefulShutdown("Unhandled Rejection detected — shutting down server...", error);
});

// Uncaught Exception
process.on("uncaughtException", (error) => {
    gracefulShutdown("Uncaught Exception detected — shutting down server...", error);
});

// SIGINT (Ctrl+C)
process.on("SIGINT", () => {
    gracefulShutdown("SIGINT received — shutting down server...");
});

// SIGTERM (System Termination)
process.on("SIGTERM", () => {
    gracefulShutdown("SIGTERM received — shutting down server...");
});
