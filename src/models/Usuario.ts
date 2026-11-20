import { Schema, model } from "mongoose";


export interface IUsuario {
    nombre: string;
    email: string;
    password: string;

}


const usuarioSchema = new Schema<IUsuario>({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const Usuario = model<IUsuario>("Usuario", usuarioSchema);