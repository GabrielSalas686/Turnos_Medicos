import type { Request, Response } from "express";
import { crearUsuario, loginUsuario } from "../services/authService.js";
import { ErrorNegocio } from "../errors/ErrorNegocio.js";
import { ErrorAutenticacion } from "../errors/ErrorAutenticacion.js";

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

export const loginDeUsuario = async (req: Request, res: Response) => {
    try {
        const usuario = await loginUsuario(req.body.email, req.body.password);
        res.status(200).json(usuario);
    } catch (error) {
        if (error instanceof ErrorAutenticacion) {
            res.status(401).json({ mensaje: error.message });
            return;
        }
        if (error instanceof ErrorNegocio) {
            res.status(400).json({ mensaje: error.message });
            return;
        }
        console.error("Error de login", error);
        res.status(500).json({ mensaje: "Error de login" });
        }
    };