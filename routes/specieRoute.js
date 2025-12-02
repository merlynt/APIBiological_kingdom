import express from "express";
import controller from "../controllers/specieController.js";

const router = express.Router();

router.get("/sum", controller.sumSpeciesByTax);
router.get("/sortStatus", controller.sortStatus);
router.get("/statusRange", controller.getSpecieByRangeStatus);
router.get("/search", controller.getByNameAndTax);
router.get("/country", controller.getSpecieByCountry);
router.get('/status', controller.getSpecieByStatus);
router.get("/exclude", controller.findByTaxExclusion);
router.get("/simple", controller.simpleSpecie);
router.get("/distribution", controller.speciesDistribution);
router.get("/endangeredSpecies", controller.endangeredSpecies);



router.get('/', controller.getSpecies);
router.get('/:id', controller.getSpecieById);
router.post('/', controller.createSpecie);
router.put('/:id', controller.updateSpecie);
router.delete('/:id', controller.deleteSpecie);

export default router;
