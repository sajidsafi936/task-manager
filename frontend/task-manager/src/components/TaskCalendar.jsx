import React, { useEffect, useState } from "react";
import "./TaskCalendar.css";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

const TaskCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Check whether two dates represent the same day
  const isSameDate = (firstDate, secondDate) => {
    return (
      firstDate.getDate() === secondDate.getDate() &&
      firstDate.getMonth() === secondDate.getMonth() &&
      firstDate.getFullYear() === secondDate.getFullYear()
    );
  };

  // Filter tasks according to a selected date
  const filterTasksByDate = (selectedDate, allTasks) => {
    return allTasks.filter((task) => {
      if (!task.dueDate) {
        return false;
      }

      const taskDate = new Date(task.dueDate);

      if (Number.isNaN(taskDate.getTime())) {
        return false;
      }

      return isSameDate(taskDate, selectedDate);
    });
  };

  // Fetch logged-in user's tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          setError("You are not logged in.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/tasks`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch tasks.");
        }

        setTasks(data);

        // Show tasks for today's date when the calendar first loads
        const todayTasks = filterTasksByDate(date, data);

        setFilteredTasks(todayTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(error.message || "Something went wrong while fetching tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Runs whenever the user selects a date
  const onChange = (selectedDate) => {
    setDate(selectedDate);

    const selectedDateTasks = filterTasksByDate(selectedDate, tasks);

    setFilteredTasks(selectedDateTasks);
  };

  return (
    <>
      <div className="Calendar-container">
        <Calendar
          onChange={onChange}
          value={date}
          className="calendar-box"
        />
      </div>

      <h3>Tasks</h3>

      <div className="filterTasks-Display">
        {loading ? (
          <p>Loading tasks...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div className="task-row" key={task._id}>
              <span className="task-title">
                {task.title}
              </span>

              <span>
                {new Date(task.dueDate).toLocaleDateString("en-GB")}
              </span>

              <span>
                {task.dueTime || "No time set"}
              </span>
            </div>
          ))
        ) : (
          <p>No tasks scheduled for this date.</p>
        )}
      </div>
    </>
  );
};

export default TaskCalendar;