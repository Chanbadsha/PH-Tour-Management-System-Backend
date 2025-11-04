import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import AppError from "../../errorHelpers/appError";
import { envVars } from "../../config/envVar";
import { IAuthProvider, IUser } from "./user.interface";
import { USER } from "./user.model";


const createUserService = async (payload: Partial<IUser>) => {
    const { password, email, ...rest } = payload;

    //  Check if user already exists
    const existingUser = await USER.findOne({ email });
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
    const user = await USER.create({ email, password: hashedPassword, auths: [authProvider], ...rest });

    return user;
};

export const UserAuthServices = {
    createUserService,
};
