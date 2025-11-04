/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AppError from "./appError";

export const GlobalErrroHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
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
};



