import { Schema, model } from "mongoose";

type Estado = 'pendiente'|'confirmado'|'cancelado';

export interface ITurno {
    paciente: string;
    especialidad: string;
    fecha: Date;
    estado: Estado; 
}


const turnoSchema = new Schema<ITurno>({
    paciente: { type: String, required: true },
    especialidad: { type: String, required: true },
    fecha: { type: Date, required: true },
    estado: {
        type: String, enum: ['pendiente', 'confirmado', 'cancelado'],
        default: 'pendiente'
    }
});

export const Turno = model<ITurno>("Turno", turnoSchema);
