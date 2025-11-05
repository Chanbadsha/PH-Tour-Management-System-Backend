/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserAuthServices } from "./user.services";
import { CatchAsync } from "../../utils/CatchAsync";
import { SendResponse } from "../../utils/SendResponse";
import { verifyJwtToken } from "../../utils/jwt";
import { envVars } from "../../config/envVar";
import { JwtPayload } from "jsonwebtoken";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo = await UserAuthServices.createUserService(req.body)
        res.status(StatusCodes.CREATED).json({
            success: true,
            statusCode: StatusCodes.CREATED,
            message: "User created successfull",
            data: userInfo
        })
    } catch (error) {
        next(error)
    }
}

const getAllUser = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const usersInfo = await UserAuthServices.getAllUserService()
    SendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "All user retrived successfully",
        data: usersInfo
    })
})

const updateUser = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.id
    const updateDoc = req.body
    const verifedToken = req.user

    const usersInfo = await UserAuthServices.updateUserService(userId, updateDoc, verifedToken)
    SendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User updated successfully",
        data: usersInfo
    })
})
export const UserAuthController = {
    createUser,
    getAllUser,
    updateUser
}