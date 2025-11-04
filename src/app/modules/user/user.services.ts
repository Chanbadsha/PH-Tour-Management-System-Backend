import { IUser } from "./user.interface";
import { USER } from "./user.model";

const createUserService = (payload: Partial<IUser>) => {
    const userInfo = USER.create(payload)
    return userInfo
}

export const UserAuthServices = {
    createUserService
}