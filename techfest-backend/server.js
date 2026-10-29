require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const eventRoutes = require("./routes/events");
const authRoutes = require("./routes/auth");
const registrationRoutes = require("./routes/registrations");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB error:", err.message));

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/registrations", registrationRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});