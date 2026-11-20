import { Router } from "express";
import { registrarUsuario } from "../controllers/authController.js"

const authRouter = Router();

authRouter.post("/register", registrarUsuario);

export default authRouter;