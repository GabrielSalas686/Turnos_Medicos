import bcrypt from "bcrypt";
import type { IUsuario } from "../models/Usuario.js";
import { Usuario } from "../models/Usuario.js";
import { ErrorNegocio } from "../errors/ErrorNegocio.js";

export const crearUsuario = async (datos: IUsuario) => {
    const duplicadoUsuario = await Usuario.findOne({ email: datos.email });
    if (!datos.nombre || !datos.email || !datos.password) {
        throw new ErrorNegocio("Faltan datos obligatorios");
    }
    if (duplicadoUsuario) {
        throw new ErrorNegocio("El usuario ya esta creado");
    }
    const claveHasheada = await bcrypt.hash(datos.password, 10);
    const usuarioCreado = await Usuario.create({
        nombre: datos.nombre,
        email: datos.email,
        password: claveHasheada,
    })
    return { id: usuarioCreado._id, nombre: usuarioCreado.nombre };
};