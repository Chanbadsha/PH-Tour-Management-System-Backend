import { Router } from "express";
import { UserAuthController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "./user.interface";


export const UserRoutes = Router()



UserRoutes.post('/register', validateRequest(createUserZodSchema), UserAuthController.createUser)
UserRoutes.get('/all-users', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserAuthController.getAllUser)