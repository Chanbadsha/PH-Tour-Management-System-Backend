import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { IUser } from "../user/user.interface";
import { USER } from "../user/user.model";
import bcryptjs from 'bcryptjs'

import { genarateToken } from "../../utils/jwt";
import { envVars } from "../../config/envVar";

const userCredentialLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload

    //  Check  user is exists
    const userIsExist = await USER.findOne({ email }).select("+password");

    if (!userIsExist) {
        throw new AppError(StatusCodes.FORBIDDEN, "No user exists with this email");
    }

    //  Ensure password is provided
    if (!password) {
        throw new AppError(StatusCodes.FORBIDDEN, "Password is required");
    }
    if (!userIsExist?.password) {
        throw new AppError(StatusCodes.FORBIDDEN, "Password is required");
    }

    //  match the password
    const matchPassword = await bcryptjs.compare(password as string, userIsExist.password as string);

    if (!matchPassword) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Password is wrong")
    }

    const accessTokenPayload = {
        userName: userIsExist.name,
        email: userIsExist.email,
        role: userIsExist.role
    }

    const accessToken = await genarateToken(accessTokenPayload, envVars.JWT_ACCESS_TOKEN_SECRET, envVars.JWT_ACCESS_TOKEN_EXPEIRED_TIME)
    return {
        "User Name": userIsExist?.name,
        "Email": userIsExist.email,
        accessToken
    }


}

export const AuthServices = {
    userCredentialLogin
}