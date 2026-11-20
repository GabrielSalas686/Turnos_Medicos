import { Router } from "express";
import { registrarUsuario, loginDeUsuario } from "../controllers/authController.js"

const authRouter = Router();

authRouter.post("/register", registrarUsuario);
authRouter.post("/login", loginDeUsuario);

export default authRouter;