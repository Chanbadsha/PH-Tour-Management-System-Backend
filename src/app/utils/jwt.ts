import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";


export const genarateToken = async (payload: JwtPayload, secret: string, expiresIn: string) => {
    const accessToken = jwt.sign(payload, secret, { expiresIn } as SignOptions)
    return accessToken
}

export const verifyJwtToken = async (token: string, secret: string) => {

    const verifyJwtToken = jwt.verify(token, secret)
    return verifyJwtToken
}