import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import AppError from "../errorHelpers/appError";
import { envVars } from "../config/envVar";
import { Users } from "../modules/user/user.model";
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";




export const seedSuperAdmin = async (): Promise<void> => {
    try {
        // ✅ Check if Super Admin already exists
        const existingAdmin = await Users.findOne({ email: envVars.SUPER_ADMIN_EMAIL });
        if (existingAdmin) {
            console.log("Super admin already exists");
            return;
        }

        // ✅ Hash the Super Admin password securely
        const hashedPassword = await bcryptjs.hash(
            envVars.SUPER_ADMIN_PASSWORD,
            envVars.HASH_SALT_COUNT
        );

        // ✅ Define authentication provider
        const authProvider: IAuthProvider = {
            provider: "Credentials",
            providerID: envVars.SUPER_ADMIN_EMAIL,
        };

        // ✅ Prepare payload for Super Admin
        const adminPayload: IUser = {
            name: "PH Super Admin",
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            role: Role.SUPER_ADMIN,
            auths: [authProvider],
            isVerified: true,
        };

        // ✅ Create the Super Admin in the database
        const superAdmin = await Users.create(adminPayload);

        if (superAdmin) {
            console.log("Super admin created successfully");
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new AppError(StatusCodes.BAD_GATEWAY, errorMessage);
    }
};
