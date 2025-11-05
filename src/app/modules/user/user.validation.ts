import z from "zod";
import { IsActive, Role } from "./user.interface";

//  Password regex rules
const passwordRules = {
    uppercase: /^(?=.*[A-Z]).+$/,
    lowercase: /^(?=.*[a-z]).+$/,
    number: /^(?=.*\d).+$/,
};

//  Bangladeshi phone number regex
const bdPhoneRegex = /^(?:\+88|88)?01[3-9]\d{8}$/;

//  Create User Schema
export const createUserZodSchema = z.object({
    name: z
        .string({ error: "Name is required" })
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(50, { message: "Name cannot exceed 50 characters" }),

    email: z
        .string({ error: "Email is required" })
        .email({ message: "Invalid email address" })
        .min(4, { message: "Email must be at least 4 characters long" })
        .max(30, { message: "Email cannot exceed 30 characters" }),

    password: z
        .string({ error: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(16, { message: "Password cannot exceed 16 characters" })
        .regex(passwordRules.uppercase, { message: "Password must contain at least one uppercase letter" })
        .regex(passwordRules.lowercase, { message: "Password must contain at least one lowercase letter" })
        .regex(passwordRules.number, { message: "Password must contain at least one number" }).optional(),

    phone: z
        .string({ error: "Phone number is required" })
        .regex(bdPhoneRegex, { message: "Phone number must be a valid Bangladeshi number" }).optional(),
});

//  Update User Schema
export const updateUserZodSchema = z.object({
    name: z
        .string({ error: "Name is required" })
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(50, { message: "Name cannot exceed 50 characters" }).optional(),


    password: z
        .string({ error: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(16, { message: "Password cannot exceed 16 characters" })
        .regex(passwordRules.uppercase, { message: "Password must contain at least one uppercase letter" })
        .regex(passwordRules.lowercase, { message: "Password must contain at least one lowercase letter" })
        .regex(passwordRules.number, { message: "Password must contain at least one number" }).optional(),

    phone: z
        .string({ error: "Phone number is required" })
        .regex(bdPhoneRegex, { message: "Phone number must be a valid Bangladeshi number" }).optional(),
    role: z.enum(Object.values(Role)).optional(),
    isDeleted: z.boolean({ error: "Is Deleted should be true or false" }).optional(),
    isActive: z.enum(Object.values(IsActive)).optional(),
    isVerified: z.boolean({ message: "Is verified should be true or false" }).optional(),
    address: z.string({ error: "Address should be string" }).optional(),
    picture: z.string({ error: "Picture url should be string" }).optional(),


});
