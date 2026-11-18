import type { Request, Response } from "express";
import { obtenerTurnos, crearTurno } from "../services/turnoService.js";


export const listarTurnos = async (req: Request, res: Response) => {
    try {
        const turnos = await obtenerTurnos();
        res.status(200).json(turnos);
    } catch (error) {
        console.error("Error al obtener turno:", error);
        res.status(500).json({ mensaje: "Error al obtener turno" });
    }
};

export const crearNuevoTurno = async (req: Request, res: Response) => {
    try {
        const datos = req.body;
        const turnoCreado = await crearTurno(datos);
        res.status(201).json(turnoCreado);
    } catch (error) {
        console.error("Error al crear turno", error);
        res.status(500).json({ mensaje: "Error al crear turno" });
    }

};