import express from "express";
import habitatCtrl from "../controllers/habitatController.js";

const router = express.Router();

router.get("/", habitatCtrl.getHabitats);
router.get("/:id", habitatCtrl.getHabitatById);
router.post("/", habitatCtrl.createHabitat);
router.put("/:id", habitatCtrl.updateHabitat);
router.delete("/:id", habitatCtrl.deleteHabitat);

export default router;
