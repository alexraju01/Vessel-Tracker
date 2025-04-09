const express = require("express");
const {
	addVessel,
	deleteVessel,
	getVessels,
	updateVessel,
} = require("../controllers/vesselController");

const router = express.Router();

router.route("/").get(getVessels).post(addVessel);

router.route("/:id").patch(updateVessel).delete(deleteVessel);

module.exports = router;
