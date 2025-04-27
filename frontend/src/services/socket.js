// src/services/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Adjust if your server is different

export default socket;
