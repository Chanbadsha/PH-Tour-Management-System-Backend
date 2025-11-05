import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import AppError from "../errorHelpers/appError"
import { JwtPayload } from "jsonwebtoken"
import { envVars } from "../config/envVar"
import { verifyJwtToken } from "../utils/jwt"



export const checkAuth = (...authRules: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.headers.authorization
        if (!accessToken) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "Access token missing");
        }

        const verifiedToken = await verifyJwtToken(accessToken, envVars.JWT_ACCESS_TOKEN_SECRET) as JwtPayload
        if (!verifiedToken) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid or expired token");
        }
        if (!authRules.includes(verifiedToken.role)) {
            throw new AppError(StatusCodes.FORBIDDEN, "Access denied: insufficient privileges");
        }
        next()
    } catch (error) {
        next(error)
    }
}