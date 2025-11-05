import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import AppError from "../errorHelpers/appError";
import { StatusCodes } from "http-status-codes";


export const genarateToken = async (payload: JwtPayload, secret: string, expiresIn: string) => {
    const accessToken = jwt.sign(payload, secret, { expiresIn } as SignOptions)
    return accessToken
}

export const verifyJwtToken = async (token: string, secret: string) => {
    if (!token) {
        throw new AppError(StatusCodes.FORBIDDEN, "No token found")
    }
    const verifyJwtToken = jwt.verify(token, secret)
    return verifyJwtToken
}