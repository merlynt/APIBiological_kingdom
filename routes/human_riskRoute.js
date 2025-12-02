import express from "express";
import controller from "../controllers/human_riskController.js";

const router = express.Router();

router.get('/', controller.getHumanRisks);
router.get('/:id', controller.getHumanRiskById);
router.post('/', controller.createHumanRisk);
router.put('/:id', controller.updateHumanRisk);
router.delete('/:id', controller.deleteHumanRisk);

export default router;