/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserAuthServices } from "./user.services";
import { CatchAsync } from "../../utils/CatchAsync";
import { SendResponse } from "../../utils/SendResponse";

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
export const UserAuthController = {
    createUser,
    getAllUser
}