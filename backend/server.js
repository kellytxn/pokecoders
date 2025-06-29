const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const preferenceRoutes = require("./routes/userpreferences");
const userScoreRoutes = require("./routes/userScore");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/preferences", preferenceRoutes);
app.use("/api/score", userScoreRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
  });
