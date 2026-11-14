import  express, { type Request, type Response} from "express";

const PORT = 3000;
const hostname = "localhost";

const app = express();
app.use (express.json());

app.get ("/", (req: Request, res: Response) => {
    res.send ("API de turnos médicos funcionando")
});

app.listen(PORT, hostname, () => {
    console.log (`Servidor corriendo en http://${hostname}:${PORT}`)
})