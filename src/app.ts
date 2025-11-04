/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import cors from 'cors'
import { router } from "./app/routes";
import AppError from "./app/errorHelpers/appError";
import { GlobalErrroHandler } from "./app/errorHelpers/globalErrorHandler";
import { NotFoundRoute } from "./app/errorHelpers/notFounRoute";

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

app.use(GlobalErrroHandler)

// ✅ Handle Not Found Routes
app.use(NotFoundRoute);







export default app;
