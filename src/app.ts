import express, { Application, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const app: Application = express();

// ✅ Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Health Check / Root Route
app.get("/", (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        success: true,
        statusCode: StatusCodes.OK,
        message: "Welcome to PH Tour Management Server 🚀",
    });
});

// ✅ Global Error Handler

// app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
//     console.error("🔥 Error:", err);

//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//         success: false,
//         statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
//         message: "Something went wrong!",
//         error: (err as Error).message || "Internal Server Error",
//     });
// });

// // ✅ Handle Not Found Routes
// app.use("*", (req: Request, res: Response) => {
//     res.status(StatusCodes.NOT_FOUND).json({
//         success: false,
//         statusCode: StatusCodes.NOT_FOUND,
//         message: "Route not found!",
//     });
// });







export default app;
