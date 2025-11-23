const express = require("express");
const router = express.Router();
const kingdomCtrl = require("../controllers/kingdomController");

router.get("/", kingdomCtrl.getKingdoms);
router.post("/", kingdomCtrl.kingdomCreate);
router.put("/:id", kingdomCtrl.kingdomUpdate);
router.delete("/:id", kingdomCtrl.kingdomDelete);
router.get("/:id", kingdomCtrl.getKingdomById);

module.exports = router;