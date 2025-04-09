const Vessel = require("../models/vessel");

// POST add vessel
exports.addVessel = async (req, res) => {
	const vessel = new Vessel(req.body);
	await vessel.save();
	res.status(201).json(vessel);
};
