import bcrypt from "bcrypt";
import type { IUsuario } from "../models/Usuario.js";
import { Usuario } from "../models/Usuario.js";
import { ErrorNegocio } from "../errors/ErrorNegocio.js";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { ErrorAutenticacion } from "../errors/ErrorAutenticacion.js";

export const crearUsuario = async (datos: IUsuario) => {
    if (!datos.nombre || !datos.email || !datos.password) {
        throw new ErrorNegocio("Faltan datos obligatorios");
    }
    const emailNormalizado = datos.email.toLowerCase().trim();
    const duplicadoUsuario = await Usuario.findOne({ email: emailNormalizado });
    if (duplicadoUsuario) {
        throw new ErrorNegocio("El usuario ya esta creado");
    }
    const claveHasheada = await bcrypt.hash(datos.password, 10);
    const usuarioCreado = await Usuario.create({
        nombre: datos.nombre,
        email: emailNormalizado,
        password: claveHasheada,
    })
    return { id: usuarioCreado._id, nombre: usuarioCreado.nombre };
};

export const loginUsuario = async (email: string, password: string) => {
    if (!email || !password) {
        throw new ErrorNegocio("Faltan datos obligatorios");
    }
    const emailNormalizado = email.toLowerCase().trim();
    const usuario = await Usuario.findOne({ email: emailNormalizado });
    if (!usuario) {
        throw new ErrorAutenticacion("Credenciales inválidas");
    }
    const coincidencia = await bcrypt.compare(password, usuario.password);
    if (!coincidencia) {
        throw new ErrorAutenticacion("Credenciales inválidas");
    }
    const token = jwt.sign({ id: usuario._id }, config.jwtSecret, { expiresIn: "1h" });
    return { token };
};