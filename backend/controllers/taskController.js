const Task = require("../models/task");
const Notification = require("../models/notification");


// ==========================================
// CREATE TASK
// ==========================================

exports.createTask = async (req, res) => {
    try {

        const task = await Task.create({
            ...req.body,
            userId: req.user.id
        });


        // Create notification when task is added
        await Notification.create({
            userId: req.user.id,
            taskId: task._id,
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



// ==========================================
// GET ALL TASKS
// ==========================================

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



// ==========================================
// UPDATE TASK
// ==========================================

exports.updateTask = async (req, res) => {
    try {

        // Find existing task
        const task = await Task.findOne({
            _id: req.params.id,
            userId: req.user.id
        });


        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }


        // Check old and new status
        const wasCompleted = task.status === "completed";
        const isBeingCompleted =
            req.body.status === "completed";


        // Update task
        Object.assign(task, req.body);

        await task.save();


        // Create completed notification
        // only when task changes from
        // pending/Overdue → completed
        if (!wasCompleted && isBeingCompleted) {

            await Notification.create({
                userId: req.user.id,
                taskId: task._id,
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



// ==========================================
// DELETE TASK
// ==========================================

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


        // Optional:
        // Delete notifications belonging to this task
        await Notification.deleteMany({
            taskId: task._id,
            userId: req.user.id
        });


        res.json({
            message: "Task deleted"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};