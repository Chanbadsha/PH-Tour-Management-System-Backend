import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import AppError from "../../errorHelpers/appError";
import { envVars } from "../../config/envVar";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { Users } from "./user.model";
import { JwtPayload } from "jsonwebtoken";

// Creat user service
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

// Get All User service
const getAllUserService = async () => {
    const users = await Users.find({})
    return users
}

// Update user data service
const updateUserService = async (userId: string, updateDoc: Partial<IUser>, decodedToken: JwtPayload) => {

    const isExistUser = await Users.findById(userId)

    if (!isExistUser) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not found")
    }

    if (updateDoc.role) {

        updateDoc.role = updateDoc.role.toUpperCase() as Role

        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "You are not permitted to update role")
        }

        if (decodedToken.role === Role.ADMIN && updateDoc.role === Role.SUPER_ADMIN) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "You are not permitted to update role")
        }

        if (decodedToken.role === Role.SUPER_ADMIN && isExistUser.role === Role.SUPER_ADMIN) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "You are not permitted to update role")
        }
    }

    if (updateDoc.isActive !== undefined || updateDoc.isDeleted !== undefined || updateDoc.isVerified !== undefined) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "You are not permitted to update role")
        }
    }

    if (updateDoc.password) {
        updateDoc.password = await bcryptjs.hash(updateDoc.password, envVars.HASH_SALT_COUNT)
    }

    const updatedUser = await Users.findByIdAndUpdate(userId, updateDoc, { new: true, runValidators: true })
    return updatedUser
}

export const UserAuthServices = {
    createUserService,
    getAllUserService,
    updateUserService
};
