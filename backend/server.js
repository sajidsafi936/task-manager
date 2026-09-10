require("dotenv").config();

const express = require("express");
const cors = require("cors");

const userRoutes = require("./routers/user");
const taskRoutes = require("./routers/taskRoutes");
const notificationRoute = require("./routers/notificationRoute")
const { connectMongoDb } = require("./connection");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notifications", notificationRoute);

// MongoDB connection
connectMongoDb(process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});