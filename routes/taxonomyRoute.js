const express = require("express");
const router = express.Router();
const taxonomyctrl = require("../controllers/taxonomyController");

router.get("/", taxonomyctrl.getTaxonomy);
router.post("/", taxonomyctrl.taxonomyCreate);
router.put("/:id", taxonomyctrl.taxonomyUpdate);
router.delete("/:id", taxonomyctrl.taxonomyDelete);

module.exports = router;