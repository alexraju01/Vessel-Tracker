const mongoose = require("mongoose");

const VesselSchema = new mongoose.Schema(
	// Don't need to specifi id as
	// mongoose schema by default creates id
	{
		name: { type: String, required: true },
		latitude: { type: Number, required: true },
		longitude: { type: Number, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Vessel", VesselSchema);
