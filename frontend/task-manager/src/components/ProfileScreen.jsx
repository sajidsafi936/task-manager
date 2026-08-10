import "./ProfileScreen.css";
import React, { useState, useEffect } from 'react'
import "./ProfileScreen.css";
import { MdCameraAlt } from "react-icons/md";
import { PiGreaterThan } from "react-icons/pi";
import {
  User,
  Lock,
  Gear,
  Question,
  SignOut,
} from "phosphor-react";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "./BottomNavbar";
import profile from "../assets/profile.png"

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

  const totalTasks = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { icon: <User size={20} />, label: "Edit Profile", onClick: () => navigate("/edit-profile") },
    { icon: <Lock size={20} />, label: "Change Password", onClick: () => navigate("/change-password") },
    { icon: <Gear size={20} />, label: "My Preferences", onClick: () => navigate("/preferences") },
    { icon: <Question size={20} />, label: "Help & Support", onClick: () => navigate("/help") },
  ];

  return (
    <div className="profile-screen">
      <div className="profile-header">
        <div className="avatar-wrap">
          <img className="avatar-img" src={profile} alt="profile" />
          <button className="avatar-edit-btn" aria-label="Change profile photo">
            <MdCameraAlt size="1.1em" />
          </button>
        </div>

        <h2 className="profile-name">{user?.name || "Your Name"}</h2>
        <p className="profile-email">{user?.email || "you@example.com"}</p>

        <div className="profile-stats">
          <div className="profile-stat">
            <h3>{loading ? "-" : totalTasks}</h3>
            <p>Tasks</p>
          </div>
          <div className="profile-stat">
            <h3>{loading ? "-" : completed}</h3>
            <p>Completed</p>
          </div>
          <div className="profile-stat">
            <h3>0</h3>
            <p>Projects</p>
          </div>
        </div>
      </div>

      <div className="profile-menu">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="profile-menu-item"
            onClick={item.onClick}
          >
            <span className="menu-item-left">
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </span>
            <PiGreaterThan className="menu-arrow" />
          </button>
        ))}

        <button className="profile-menu-item logout" onClick={handleLogout}>
          <span className="menu-item-left">
            <span className="menu-icon logout-icon"><SignOut size={20} /></span>
            <span className="menu-label">Logout</span>
          </span>
        </button>
      </div>

      <BottomNavbar />
    </div>
  )
}

export default ProfileScreen
