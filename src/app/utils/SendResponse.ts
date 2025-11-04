import { Response } from "express"

interface TMeta {
    total: number
}

interface TResponse<T> {
    statusCode: number,
    message: string,
    success: true,
    data: T,
    meta?: TMeta
}

export const SendResponse = <T>(res: Response, payload: TResponse<T>) => {
    res.status(payload.statusCode).json({
        success: payload.success,
        StatusCode: payload.statusCode,
        message: payload.message,
        data: payload.data || null,
        meta: payload.meta
    })
}