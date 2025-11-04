/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import cors from 'cors'
import { router } from "./app/routes";
import AppError from "./app/errorHelpers/appError";

const app: Application = express();

// ✅ Global Middlewares
app.use(express.json());
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Router Middleware
app.use('/api/v1', router)

// ✅ Health Check / Root Route
app.get("/", (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        success: true,
        statusCode: StatusCodes.OK,
        message: "Welcome to PH Tour Management Server 🚀",
    });
});




// ✅ Global Error Handler

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = "Internal Server Error";

    if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
    } else if (err instanceof Error) {
        message = err.message
    }

    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: message,
        error: (err as Error).message || "Internal Server Error",
    });
});

// ✅ Handle Not Found Routes
app.use((req: Request, res: Response) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: "Route not found!",
    });
});







export default app;
