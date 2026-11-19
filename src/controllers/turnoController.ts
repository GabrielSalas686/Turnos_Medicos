import type { Request, Response } from "express";
import { obtenerTurnos, crearTurno, obtenerTurnoPorId, actualizarTurno, eliminarTurno } from "../services/turnoService.js";


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
        if (error instanceof Error && error.name === "ValidationError") {
            res.status(400).json({ mensaje: "Datos inválidos" });
            return;
        }
        console.error("Error al crear turno", error);
        res.status(500).json({ mensaje: "Error al crear turno" });
    }
};

export const obtenerTurno = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const turno = await obtenerTurnoPorId(req.params.id);
        if (!turno) {
            res.status(404).json({ mensaje: "Turno no encontrado" });
            return;
        }
        res.status(200).json(turno);
    } catch (error) {
        if (error instanceof Error && error.name === "CastError") {
            res.status(400).json({ mensaje: "ID inválido" });
            return;
        }
        console.error(error);
        res.status(500).json({ mensaje: "Error interno al obtener el turno" });
    }
};

export const actualizarTurnoPorId = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const turno = await actualizarTurno(req.params.id, req.body);
        if (!turno) {
            res.status(404).json({ mensaje: "El turno que quiere actualizar no existe" });
            return;
        }
        res.status(200).json(turno);
    } catch (error) {
        if (error instanceof Error && error.name === "ValidationError") {
            res.status(400).json({ mensaje: "Datos inválidos" });
            return;
        }
        if (error instanceof Error && error.name === "CastError") {
            res.status(400).json({ mensaje: "ID inválido" });
            return;
        }
        console.error("Error al actualizar turno", error);
        res.status(500).json({ mensaje: "Error al actualizar turno" });
    }
};

export const eliminarTurnoPorId = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const turno = await eliminarTurno(req.params.id);
        if (!turno) {
            res.status(404).json({ mensaje: "El turno que quiere borrar no existe" });
            return;
        }
        res.status(200).json({ mensaje: "Turno borrado con éxito", turno });
    } catch (error) {
        if (error instanceof Error && error.name === "CastError") {
            res.status(400).json({ mensaje: "ID inválido" });
            return;
        }
        console.error(error);
        res.status(500).json({ mensaje: "Error al borrar el turno" });
    }
};
