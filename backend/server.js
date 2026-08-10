require('dotenv').config();
const express = require("express");
const userRoutes = require("../backend/routers/user");
const mongoose = require("mongoose");
const { type } = require("node:os");
const {connectMongoDb} = require("./connection")
const router = express.Router();
const path = require("path");
const cors = require("cors");
const taskRoutes = require("./routers/taskRoutes");

//connection
connectMongoDb("mongodb://127.0.0.1:27017/task-manager");

const app = express();
app.use(cors())


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));



//router
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);




app.listen(5000, (req, res)=> console.log("server started"));

