import express from "express";
import taxonomyctrl from "../controllers/taxonomyController.js";

const router = express.Router();

router.get("/", taxonomyctrl.getTaxonomy);
router.post("/", taxonomyctrl.taxonomyCreate);
router.put("/:id", taxonomyctrl.taxonomyUpdate);
router.delete("/:id", taxonomyctrl.taxonomyDelete);

export default router;