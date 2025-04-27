const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const { addVessel } = require("./controllers/vesselController");
const vesselRoutes = require("./routes/vesselRoutes");
const { createServer } = require("http");
const { Server } = require("socket.io");

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app); // Create HTTP server

const io = new Server(httpServer, {
	cors: {
		origin: "*",
	},
});

app.use((req, res, next) => {
	req.io = io;
	next();
});

app.use(cors());
app.use(express.json());

// REST API routes
app.use("/api/vessels", vesselRoutes);

// 404 handler
app.use((req, res) => {
	res.status(404).json({
		status: "fail",
		message: `Route ${req.originalUrl} not found`,
	});
});

io.on("connection", (socket) => {
	console.log("A user connected:", socket.id);

	socket.emit("welcome", "Welcome to the Vessel Tracker!");

	socket.on("disconnect", () => {
		console.log("User disconnected:", socket.id);
	});
});

const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
