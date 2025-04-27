// const vessel = require("../models/vessel");

const Vessel = require("../models/vessel");

// POST add vessel
exports.addVessel = async (req, res) => {
	const vessel = new Vessel(req.body);
	await vessel.save();
	// custom realtime event name
	req.io.emit("newVesselData", vessel);
	res.status(201).json(vessel);
};

// Delete vessel
exports.deleteVessel = async (req, res) => {
	const { id } = req.params;

	await Vessel.findByIdAndDelete(id);

	req.io.emit("deleteVesselData", id);

	res.status(204).json({
		status: "success",
		data: null,
	});
};

// GET all vessel
exports.getVessels = async (req, res) => {
	const vessels = await Vessel.find();

	res.status(200).json({ status: "success", results: vessels.length, data: vessels });
};

// PUT update vessels
exports.updateVessel = async (req, res) => {
	const { id } = req.params;
	const updatedVessel = await Vessel.findByIdAndUpdate(id, req.body, {
		new: true,
	});

	if (!updatedVessel) {
		return res.status(404).json({ status: "fail", message: "Vessel not found" });
	}

	req.io.emit("updateVesselData", updatedVessel);

	res.status(200).json({ status: "success", data: updatedVessel });
};
