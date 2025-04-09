const mongoose = require("mongoose");

const VesselSchema = new mongoose.Schema(
	// Don't need to specify id as
	// mongoose schema by default creates id
	{
		name: { type: String, required: true },
		latitude: { type: Number, required: false },
		longitude: { type: Number, required: false },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Vessel", VesselSchema);
