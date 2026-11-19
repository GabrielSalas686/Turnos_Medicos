import { Router } from "express";
import { listarTurnos, crearNuevoTurno, actualizarTurnoPorId, obtenerTurno, eliminarTurnoPorId } from "../controllers/turnoController.js";

const router = Router();

router.get("/", listarTurnos);
router.post("/", crearNuevoTurno);
router.get("/:id", obtenerTurno);
router.put("/:id", actualizarTurnoPorId);
router.delete("/:id", eliminarTurnoPorId);

export default router;