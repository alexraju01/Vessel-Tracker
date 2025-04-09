const express = require("express");
const { addVessel } = require("../controllers/vesselController");

const router = express.Router();

router.post("/", addVessel);

module.exports = router;
