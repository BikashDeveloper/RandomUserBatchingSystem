const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const config = require("./config/config");
const { fetchUsersInBatches } = require("./services/fetchUsersService");

const app = express();

app.use(express.json());
app.use("/api", userRoutes);

mongoose
    .connect(config.database.uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected successfully");
        fetchUsersInBatches(); // Start background task
    })
    .catch((err) => console.error("MongoDB connection error:", err));

module.exports = app;
