import { Turno } from "../models/Turno.js";
import type { ITurno } from "../models/Turno.js";
import { ErrorNegocio } from "../errors/ErrorNegocio.js";

export const obtenerTurnos = async () => {
    return await Turno.find();
};

export const crearTurno = async (datos: ITurno) => {

    if (new Date(datos.fecha) < new Date()) {
        throw new ErrorNegocio("No se puede pedir un turno en una fecha pasada");
    }

    const choque = await Turno.findOne({ fecha: datos.fecha, especialidad: datos.especialidad, estado: { $ne: "cancelado" } });
    if (choque) {
        throw new ErrorNegocio("El turno de esa especialidad ya está ocupado en ese horario");
    }
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