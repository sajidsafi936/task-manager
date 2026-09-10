const Task = require('../models/task');
const Notification = require("../models/notification");

// Create task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user.id
    });

    // Create notification when a task is added
    await Notification.create({
      userId: req.user.id,
      type: "added",
      title: "New Task Added",
      message: `You added the task "${task.title}"`
    });

    res.status(201).json(task);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// Get all tasks for logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user.id
    }).sort({
      dueDate: 1
    });

    res.json(tasks);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// Update task
exports.updateTask = async (req, res) => {
  try {

    // First find the existing task
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    // Check the old and new status
    const wasCompleted = task.status === "completed";
    const isBeingCompleted = req.body.status === "completed";

    // Update the task with the new data
    Object.assign(task, req.body);

    await task.save();


    // Create notification only when task changes to completed
    if (!wasCompleted && isBeingCompleted) {

      await Notification.create({
        userId: req.user.id,
        type: "completed",
        title: "Task Completed",
        message: `You completed the task "${task.title}"`
      });

    }

    res.json(task);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// Delete task
exports.deleteTask = async (req, res) => {
  try {

    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json({
      message: "Task deleted"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};