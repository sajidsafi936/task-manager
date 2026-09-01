import React, { useState } from "react";
import "./AddTask.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddTask = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    catagory: "Work",
    proiority: "Medium",
    dueDate: "",
    dueTime: "",
    repeat: "Never",
    reminder: "5 min before",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Task created successfully!");
        navigate("/HomeDashboard");
      } else {
        toast.error(data.message || "Failed to create task");
      }
    } catch (err) {
      console.error("Create task error:", err);
      toast.error("Unable to connect to the server.");
    }
  };

  return (
    <>
      <div className="addTask-header">
        <FaArrowLeft
          className="left-arrow"
          color="black"
          onClick={() => navigate("/HomeDashboard")}
        />

        <h4>Add new tasks</h4>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="title-form">
          <label htmlFor="title">Task Title</label>

          <input
            type="text"
            name="title"
            id="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="description-form">
          <label htmlFor="description">Description</label>

          <textarea
            name="description"
            id="description"
            placeholder="Add your description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Task category */}

        <div className="task-detail">

          <div className="custom-input">

            <div className="catagory">
              <h4>Catogory</h4>
            </div>

            <div className="catogory-box">
              <select 
              name="catagory" 
              value={formData.catagory}
              onChange={handleChange}              
              >
                <option value="Work">Work</option>
                <option value="Study">Study</option>
                <option value="Personal">Personal</option>
                <option value="Other">Other</option>
              </select>
            </div>

          </div>

          <div className="proiority">

            <h4>Proiority</h4>

            <select
              name="proiority"
              value={formData.proiority}
              onChange={handleChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

          </div>

        </div>

        {/* Due date and time */}

        <div className="task-detail">

          <div className="custom-input">

            <div className="catagory">
              <h4>Due Date</h4>
            </div>

            <div className="catogory-box">

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="proiority">

            <h4>Due Time</h4>

            <input
              type="time"
              name="dueTime"
              value={formData.dueTime}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* Repeat and reminder */}

        <div className="task-detail">

          <div className="custom-input">

            <div className="catagory">
              <h4>Repeat</h4>
            </div>

            <div className="catogory-box-select">

              <select
                name="repeat"
                value={formData.repeat}
                onChange={handleChange}
              >
                <option value="Never">Never</option>
                <option value="Always">Always</option>
                <option value="Once">Once</option>
              </select>

            </div>

          </div>

          <div className="proiority">

            <h4>Reminder</h4>

            <select
              name="reminder"
              value={formData.reminder}
              onChange={handleChange}
            >
              <option value="5 min before">5 min before</option>
              <option value="10 min before">10 min before</option>
              <option value="15 min before">15 min before</option>
              <option value="20 min before">20 min before</option>
              <option value="25 min before">25 min before</option>
              <option value="30 min before">30 min before</option>
              <option value="1 hr before">1 hr before</option>
            </select>

          </div>

        </div>

        <button
          type="submit"
          className="createTask-btn"
        >
          Create Task
        </button>

      </form>
    </>
  );
};

export default AddTask;