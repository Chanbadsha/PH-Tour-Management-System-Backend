import { Types } from "mongoose";

export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    GUIDE = "GUIDE",
}

// Auth provider interface
export interface IAuthProvider {
    provider: "Google" | "Credentials";
    providerID: string;
}

// Active status enum
export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED",
}

// User interface
export interface IUser {
    name: string;
    email: string;
    password?: string;
    phone?: string;
    picture?: string;
    address?: string;
    isVerified?: boolean;
    isDeleted?: boolean;
    isActive?: IsActive;
    auths: IAuthProvider[];
    role: Role;
    booking?: Types.ObjectId[];
    guides?: Types.ObjectId[];
}
