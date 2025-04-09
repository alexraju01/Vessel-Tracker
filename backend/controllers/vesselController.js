// const vessel = require("../models/vessel");

const Vessel = require("../models/vessel");

// POST add vessel
exports.addVessel = async (req, res) => {
	const vessel = new Vessel(req.body);
	await vessel.save();
	res.status(201).json(vessel);
};

// Delete vessel
exports.deleteVessel = async (req, res) => {
	const { id } = req.params;

	await Vessel.findByIdAndDelete(id);

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
	const updatedVessal = await Vessel.findByIdAndUpdate(id, req.body, {
		new: true,
	});

	if (!updatedVessal) {
		return res.status(404).json({ status: "fail", message: "Vessel not found" });
	}

	res.status(200).json({ status: "success", data: updatedVessal });
};
