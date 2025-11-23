const express = require('express');
const router = express.Router();
const habitatCtrl = require('../controllers/habitatController');

router.get("/", habitatCtrl.getHabitats);
router.get("/:id", habitatCtrl.getHabitatById);
router.post("/", habitatCtrl.createHabitat);
router.put("/:id", habitatCtrl.updateHabitat);
router.delete("/:id", habitatCtrl.deleteHabitat);

module.exports = router;
