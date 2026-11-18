import { Turno } from "../models/Turno.js";
import type { ITurno } from "../models/Turno.js";

export const obtenerTurnos = async () => {
    return await Turno.find();
};

export const crearTurno = async (datos: ITurno) => {
    return await Turno.create(datos);
};