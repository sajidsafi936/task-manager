const Task = require("./models/task");
const Notification = require("./models/notification");


// ==========================================
// Convert reminder text into minutes
// ==========================================

const getReminderMinutes = (reminder) => {

    switch (reminder) {

        case "5 min before":
            return 5;

        case "10 min before":
            return 10;

        case "15 min before":
            return 15;

        case "20 min before":
            return 20;

        case "25 min before":
            return 25;

        case "30 min before":
            return 30;

        case "1 hr before":
            return 60;

        default:
            return 5;
    }
};



// ==========================================
// Create actual due date/time
// ==========================================

const getTaskDueDateTime = (task) => {

    if (!task.dueDate || !task.dueTime) {
        return null;
    }


    // Get YYYY-MM-DD from MongoDB date
    const date = new Date(task.dueDate);

    const year = date.getUTCFullYear();
    const month = String(
        date.getUTCMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getUTCDate()
    ).padStart(2, "0");


    /*
      Your users are entering Pakistan time
      through the HTML date/time inputs.

      +05:00 converts Pakistan time to UTC.
    */

    return new Date(
        `${year}-${month}-${day}T${task.dueTime}:00+05:00`
    );
};



// ==========================================
// Check upcoming and reminder notifications
// ==========================================

const checkNotifications = async () => {

    try {

        const now = new Date();


        // Only check unfinished tasks
        const tasks = await Task.find({
            status: {
                $in: ["pending", "Overdue"]
            },
            dueDate: {
                $exists: true
            },
            dueTime: {
                $exists: true,
                $ne: ""
            }
        });


        for (const task of tasks) {

            const dueDateTime =
                getTaskDueDateTime(task);


            if (!dueDateTime) {
                continue;
            }


            // Ignore tasks that are already due
            if (dueDateTime <= now) {
                continue;
            }



            // ======================================
            // UPCOMING NOTIFICATION
            // ======================================

            const upcomingTime =
                new Date(
                    dueDateTime.getTime() -
                    (24 * 60 * 60 * 1000)
                );


            /*
              Create upcoming notification when
              the task is within 24 hours of due time.
            */

            if (now >= upcomingTime) {

                const existingUpcoming =
                    await Notification.findOne({
                        taskId: task._id,
                        userId: task.userId,
                        type: "upcoming"
                    });


                if (!existingUpcoming) {

                    await Notification.create({
                        userId: task.userId,
                        taskId: task._id,
                        type: "upcoming",
                        title: "Upcoming Tasks",
                        message:
                            `Your task "${task.title}" is due soon.`
                    });

                    console.log(
                        `Upcoming notification created for: ${task.title}`
                    );
                }
            }



            // ======================================
            // REMINDER NOTIFICATION
            // ======================================

            const reminderMinutes =
                getReminderMinutes(task.reminder);


            const reminderTime =
                new Date(
                    dueDateTime.getTime() -
                    (reminderMinutes * 60 * 1000)
                );


            /*
              If the reminder time has arrived,
              create the notification.
            */

            if (now >= reminderTime) {

                const existingReminder =
                    await Notification.findOne({
                        taskId: task._id,
                        userId: task.userId,
                        type: "reminder"
                    });


                if (!existingReminder) {

                    await Notification.create({
                        userId: task.userId,
                        taskId: task._id,
                        type: "reminder",
                        title: "Task Reminder",
                        message:
                            `Your task "${task.title}" is due in ${task.reminder.replace(" before", "")}.`
                    });

                    console.log(
                        `Reminder notification created for: ${task.title}`
                    );
                }
            }
        }

    } catch (err) {

        console.error(
            "Notification scheduler error:",
            err
        );

    }
};



// ==========================================
// Start scheduler
// ==========================================

const startNotificationScheduler = () => {

    // Run immediately when server starts
    checkNotifications();


    // Then check every 1 minute
    setInterval(
        checkNotifications,
        60 * 1000
    );


    console.log(
        "Notification scheduler started..."
    );
};


module.exports = startNotificationScheduler;