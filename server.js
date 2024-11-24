import express from "express";
import dotenv from "dotenv";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
import cors from "cors";

// Load environment variables
dotenv.config();

// Constants
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Routes
app.use("/api/messages", messageRoutes);

// Start the server
server.listen(PORT, async () => {
  try {
    await connectToMongoDB();
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
});
