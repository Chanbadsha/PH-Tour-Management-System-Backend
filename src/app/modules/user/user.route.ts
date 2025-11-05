import { Router } from "express";
import { UserAuthController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema } from "./user.validation";

export const UserRoutes = Router()

UserRoutes.post('/register', validateRequest(createUserZodSchema), UserAuthController.createUser)
UserRoutes.get('/all-users', UserAuthController.getAllUser)