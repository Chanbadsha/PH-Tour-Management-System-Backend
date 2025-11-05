import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import AppError from "../../errorHelpers/appError";
import { envVars } from "../../config/envVar";
import { IAuthProvider, IUser } from "./user.interface";
import { Users } from "./user.model";


const createUserService = async (payload: Partial<IUser>) => {
    const { password, email, ...rest } = payload;

    //  Check if user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
        throw new AppError(StatusCodes.BAD_REQUEST, "A user already exists with this email");
    }

    //  Ensure password is provided
    if (!password) {
        throw new AppError(StatusCodes.FORBIDDEN, "Password is required");
    }

    //  Hash the password
    const hashedPassword = await bcryptjs.hash(password, envVars.HASH_SALT_COUNT);

    const authProvider: IAuthProvider = {
        provider: "Credentials",
        providerID: email as string
    }

    //  Create and save user
    const user = await Users.create({ email, password: hashedPassword, auths: [authProvider], ...rest });

    return user;
};

// Get All User

const getAllUserService = async () => {
    const users = await Users.find({})
    return users
}

export const UserAuthServices = {
    createUserService,
    getAllUserService
};
