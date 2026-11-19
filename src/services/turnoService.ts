import { Turno } from "../models/Turno.js";
import type { ITurno } from "../models/Turno.js";

export const obtenerTurnos = async () => {
    return await Turno.find();
};

export const crearTurno = async (datos: ITurno) => {
    return await Turno.create(datos);
};

export const obtenerTurnoPorId = async (id: string) => {
    return await Turno.findById(id);
};

export const actualizarTurno = async (id: string, datos: Partial<ITurno>) => {
    return await Turno.findByIdAndUpdate(id, datos, { new: true, runValidators: true });
};

export const eliminarTurno = async (id: string) => {
    return await Turno.findByIdAndDelete(id);
};