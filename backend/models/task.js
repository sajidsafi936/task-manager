const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    catagory: {
        type: String,
        enum: ['work', 'Study', 'Personal', 'Other'],
        default: 'Work'
    },
    proiority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    dueDate: Date,
    dueTime: String,
    repeat: {
        type: String,
        default: 'Never'
    },
    reminder: String,
    status: {
        type: String,
        enum: ['pending', 'completed', 'Overdue'],
        default: 'pending'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;