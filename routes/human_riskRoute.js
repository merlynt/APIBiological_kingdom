const express = require('express');
const router = express.Router();
const controller = require('../controllers/human_riskController');

router.get('/', controller.getHumanRisks);
router.get('/:id', controller.getHumanRiskById);
router.post('/', controller.createHumanRisk);
router.put('/:id', controller.updateHumanRisk);
router.delete('/:id', controller.deleteHumanRisk);

module.exports = router;