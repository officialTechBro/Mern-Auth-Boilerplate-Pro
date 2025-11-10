import { Router } from "express";
import { loginUser, logoutUser, signUpUser, verifyEmail } from "../controllers/auth.controller.js";

const authRoute = Router()

authRoute.post("/signup", signUpUser)
authRoute.post("/login", loginUser)
authRoute.post("/logout", logoutUser)

authRoute.post("/verify-email", verifyEmail)

export default authRoute