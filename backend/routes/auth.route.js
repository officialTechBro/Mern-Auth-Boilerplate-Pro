import { Router } from "express";
import { forgotPassword, loginUser, logoutUser, resetPassword, signUpUser, verifyEmail } from "../controllers/auth.controller.js";

const authRoute = Router()

authRoute.post("/signup", signUpUser)
authRoute.post("/login", loginUser)
authRoute.post("/logout", logoutUser)

authRoute.post("/verify-email", verifyEmail)
authRoute.post("/forgot-password", forgotPassword)
authRoute.post("/reset-password/:token", resetPassword)

export default authRoute