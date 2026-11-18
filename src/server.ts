import express, { type Request, type Response } from "express";
import { conectarDB } from "./config/db.js";
import { config } from "./config/env.js";
import router from "./routes/turnoRoutes.js";

const app = express();
app.use(express.json());
app.use("/turnos", router);

app.get("/", (req: Request, res: Response) => {
    res.send("API de turnos médicos funcionando")
});

const iniciar = async () => {
    try {
        await conectarDB();
        app.listen(config.port, () => {
            console.log(`Servidor en http://localhost:${config.port}`);
        });
    } catch (error) {
        console.error("No se pudo iniciar el servidor:", error);
        process.exit(1);
    }
};

iniciar();
