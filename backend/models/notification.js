const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({

    // User who owns the notification
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // Task that generated the notification
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: false
    },

    type: {
        type: String,
        enum: [
            "reminder",
            "completed",
            "upcoming",
            "added",
            "report"
        ],
        required: true
    },

    title: {
        type: String,
        enum: [
            "Task Reminder",
            "Task Completed",
            "Upcoming Tasks",
            "New Task Added",
            "Weekly Report"
        ],
        required: true
    },

    message: {
        type: String,
        required: true
    },

    time: {
        type: Date,
        default: Date.now
    },

    read: {
        type: Boolean,
        default: false
    }

});

const Notification = mongoose.model(
    "Notification",
    notificationSchema
);

module.exports = Notification;