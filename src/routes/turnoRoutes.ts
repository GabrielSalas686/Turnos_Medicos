import { Router } from "express";
import { listarTurnos, crearNuevoTurno, actualizarTurnoPorId, obtenerTurno, eliminarTurnoPorId } from "../controllers/turnoController.js";
import { verificarToken } from "../middlewares/verificarToken.js";

const router = Router();

router.get("/", listarTurnos);
router.post("/", verificarToken,crearNuevoTurno);
router.get("/:id", obtenerTurno);
router.put("/:id", actualizarTurnoPorId, verificarToken);
router.delete("/:id", eliminarTurnoPorId, verificarToken);

export default router;