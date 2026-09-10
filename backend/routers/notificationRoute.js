const express = require("express");
const router = express.Router();

const Notification = require("../models/notification.js");
const authMiddleware = require("../middleware/authMiddleware");


// Protect all notification routes
router.use(authMiddleware);


// Get notifications for logged-in user
router.get("/", async (req, res) => {
    try {

        const notifications = await Notification.find({
            userId: req.user.id
        }).sort({
            time: -1
        });

        return res.status(200).json(notifications);

    } catch (err) {

        return res.status(500).json({
            message: err.message,
        });

    }
});


// Delete notification
router.delete("/:id", async (req, res) => {
    try {

        const { id } = req.params;

        const notification = await Notification.findOneAndDelete({
            _id: id,
            userId: req.user.id
        });

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found",
            });
        }

        return res.status(200).json({
            message: "Notification deleted successfully!",
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message,
        });

    }
});


module.exports = router;
