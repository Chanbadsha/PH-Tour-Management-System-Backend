import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserAuthServices } from "./user.services";

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

export const UserAuthController = {
    createUser
}