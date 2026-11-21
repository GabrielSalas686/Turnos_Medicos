import type { Request, Response, NextFunction } from "express";
import { config } from "../config/env.js"
import jwt from "jsonwebtoken";

export function verificarToken(req: Request, res: Response, next: NextFunction) {
    const autorizacion = req.headers["authorization"];
    if (!autorizacion || !autorizacion.startsWith("Bearer ")) {
        return res.status(401).json({ mensaje: "Falta la clave" });
    }

    const valor = autorizacion.split(" ")[1];
    if (!valor) {
        return res.status(401).json({ mensaje: "Falta el codigo" });
    }
    try {
        jwt.verify(valor, config.jwtSecret);
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: "Clave inválida" });
    }
};



