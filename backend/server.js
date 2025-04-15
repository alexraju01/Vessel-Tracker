const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const { addVessel } = require("./controllers/vesselController");
const vesselRoutes = require("./routes/vesselRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/vessels", vesselRoutes);

app.use((req, res) => {
	res.status(404).json({
		status: "fail",
		message: `Route ${req.originalUrl} not found`,
	});
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
