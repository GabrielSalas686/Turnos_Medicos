import { Router } from "express";
import { listarTurnos, crearNuevoTurno } from "../controllers/turnoController.js";

const router = Router();

router.get ("/", listarTurnos);
router.post ("/", crearNuevoTurno);

export default router;