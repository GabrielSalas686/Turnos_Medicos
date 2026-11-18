import "dotenv/config";

const obligatoria = (nombre: string): string => {
    const valor = process.env[nombre];
    if (!valor) {
        throw new Error(`Falta la variable de entorno ${nombre}. Revisá tu archivo .env`);
    }
    return valor;
};

export const config = {
    port: Number(process.env.PORT) || 3000,
    mongodbUri: obligatoria("MONGO_URI"),
};
