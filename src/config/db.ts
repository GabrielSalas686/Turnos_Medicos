import mongoose from "mongoose";
import { config } from "./env.js";

export const conectarDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.log("No se pudo conectar a la base de datos", error);
    process.exit(1);
  }
}

