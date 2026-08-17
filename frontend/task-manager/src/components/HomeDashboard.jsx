import React, { useState, useEffect } from 'react'
import "./HomeDashboard.css";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { SiGoogletasks } from 'react-icons/si';
import { MdPendingActions } from "react-icons/md";
import { TbCalendarDue } from "react-icons/tb";
import { PiGreaterThan } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import BottomNavbar from "./BottomNavbar"
import profile from "../assets/profile.png"

const HomeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://valiant-reverence-production-f75a.up.railway.app/api/tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setTasks(data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Calculate stats from real data
  const totalTasks = tasks.length;

  const completed = tasks.filter(
    t => t.status === 'completed'
  ).length;

  const pending = tasks.filter(
    t => t.status === 'pending'
  ).length;

  const overdue = tasks.filter(
    t =>
      t.status === 'pending' &&
      t.dueDate &&
      new Date(t.dueDate) < new Date()
  ).length;

  const toggleTaskStatus = async (task) => {
    try {
      const token = localStorage.getItem("token");

      const newStatus =
        task.status === "completed"
          ? "pending"
          : "completed";

      const res = await fetch(
        `https://valiant-reverence-production-f75a.up.railway.app/api/tasks/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus
          }),
        }
      );

      const updatedTask = await res.json();

      if (res.ok) {
        // Update local state so UI reflects the change immediately
        setTasks(prevTasks =>
          prevTasks.map(t =>
            t._id === task._id
              ? updatedTask
              : t
          )
        );
      } else {
        console.error(updatedTask.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className='home-dashboard'>

      <div className='header'>

        <div className="greeting">
          <p>Good Morning</p>
          <h2>{user?.name || "there"} 👋</h2>
        </div>

        <div className="notification-profile">
          <IoMdNotificationsOutline
            size='2em'
            style={{
              marginBottom: '4px',
              marginRight: '16px'
            }}
          />

          <img
            className='header-img'
            id='profile-img'
            src={profile}
            alt="profile-img"
          />
        </div>

      </div>

      <div className='search'>

        <FiSearch className="search-icon" />

        <input
          type="search"
          placeholder="Search tasks..."
        />

      </div>

      <div className="dashboard-summary">

        <div className="stat-card" id='total-tasks'>

          <FaTasks size='2em' />

          <div className='stat-info'>
            <p>Total Tasks</p>
            <h3>{totalTasks}</h3>
          </div>

        </div>

        <div className="stat-card" id='completed'>

          <SiGoogletasks size='2em' />

          <div className='stat-info'>
            <p>Completed</p>
            <h3>{completed}</h3>
          </div>

        </div>

        <div className="stat-card" id='pending'>

          <MdPendingActions size='2em' />

          <div className='stat-info'>
            <p>Pending</p>
            <h3>{pending}</h3>
          </div>

        </div>

        <div className="stat-card" id='overdue'>

          <TbCalendarDue size='2em' />

          <div className='stat-info'>
            <p>Overdue</p>
            <h3>{overdue}</h3>
          </div>

        </div>

      </div>

      <div className="task-catagories">

        <div className="task-heading">

          <div className="todays-task">
            All Tasks
          </div>

          <div className="see-all">
            See all
          </div>

        </div>

        <div className="task-list">

          {tasks.length === 0 && (
            <p>
              No tasks yet. Create one to get started!
            </p>
          )}

          {tasks.map(task => (

            <div
              className="task-card"
              key={task._id}
            >

              <input
                type="checkbox"
                checked={task.status === 'completed'}
                onChange={() => toggleTaskStatus(task)}
              />

              <div className="task-info">

                <h3>{task.title}</h3>

                <p>
                  {task.dueDate
                    ? new Date(
                        task.dueDate
                      ).toLocaleDateString()
                    : "No due date"}

                  {task.dueTime
                    ? `, ${task.dueTime}`
                    : ""}
                </p>

              </div>

              <div className="task-right">

                <span
                  className={`priority-${task.proiority?.toLowerCase()}`}
                >
                  • {task.proiority}
                </span>

                <span className="arrow">
                  <PiGreaterThan />
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

      <footer>
        <BottomNavbar />
      </footer>

    </div>
  )
}

export default HomeDashboard;