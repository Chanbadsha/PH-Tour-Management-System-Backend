import { Router } from "express";
import { UserAuthController } from "./user.controller";

export const UserRoutes = Router()

UserRoutes.post('/register', UserAuthController.createUser)