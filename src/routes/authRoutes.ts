import { Router } from "express";
import { registrarUsuario, resultadoLogin } from "../controllers/authController.js"

const authRouter = Router();

authRouter.post("/register", registrarUsuario);
authRouter.post("/login", resultadoLogin);

export default authRouter;