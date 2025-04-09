const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { addVessel } = require("./controllers/vesselController");
const vesselRoutes = require("./routes/vesselRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/vessels", vesselRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
