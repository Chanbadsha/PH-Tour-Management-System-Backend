import { Router } from "express";
import { AuthController } from "./auth.controller";

export const AuthRoutes = Router()

AuthRoutes.use('/credential-login', AuthController.userCredentialLogin)