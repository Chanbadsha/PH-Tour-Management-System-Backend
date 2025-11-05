/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { CatchAsync } from "../../utils/CatchAsync"
import { SendResponse } from "../../utils/SendResponse"
import { StatusCodes } from "http-status-codes"
import { AuthServices } from "./auth.services"

const userCredentialLogin = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userInfo = await AuthServices.userCredentialLogin(req.body)
    SendResponse(res, { success: true, statusCode: StatusCodes.OK, message: "User login successfull", data: userInfo })

})
export const AuthController = {
    userCredentialLogin
}