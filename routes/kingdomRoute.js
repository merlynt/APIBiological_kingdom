import express from "express";
import kingdomCtrl from "../controllers/kingdomController.js";

const router = express.Router();

router.get("/", kingdomCtrl.getKingdoms);
router.post("/", kingdomCtrl.kingdomCreate);
router.put("/:id", kingdomCtrl.kingdomUpdate);
router.delete("/:id", kingdomCtrl.kingdomDelete);
router.get("/:id", kingdomCtrl.getKingdomById);

export default router;
