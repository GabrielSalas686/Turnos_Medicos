import type { Request, Response } from "express";
import { crearUsuario } from "../services/authService.js";
import { ErrorNegocio } from "../errors/ErrorNegocio.js";

export const registrarUsuario = async (req: Request, res: Response) => {
    try {
        const usuario = await crearUsuario(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        if (error instanceof Error && error.name === "ValidationError") {
            res.status(400).json({ mensaje: "Datos inválidos" });
            return;
        }
        if (error instanceof ErrorNegocio) {
            res.status(400).json({ mensaje: error.message });
            return;
        }
        console.error("Error al registrar", error);
        res.status(500).json({ mensaje: "Error al registrar" });
    }
};