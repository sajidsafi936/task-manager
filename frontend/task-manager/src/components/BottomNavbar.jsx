import "./BottomNavbar.css"
import { NavLink} from "react-router-dom";


import {
  House,
  Calendar,
  Plus,
  ChartLine,
  User,
} from "phosphor-react";
import { useState } from "react";

function BottomNavbar() {
  return (
    <div className="bottom-nav">

      <NavLink to="/HomeDashboard">
      <div className="nav-item active">
        <House size={22} weight="fill"/>
        <span>Home</span>
      </div>      
      </NavLink>

      <NavLink to='/TaskCalendar'>
        <div className="nav-item">
        <Calendar size={22} />
        <span>Calendar</span>
      </div>
      </NavLink>

      <button className="add-btn">
        <NavLink to='/AddTask'>
        <Plus size={28} weight="bold" />        
        </NavLink>
        
      </button>

      <NavLink to="/Progress">
        <div className="nav-item">
        <ChartLine size={22} />
        <span>Progress</span>
        </div>      
      </NavLink>
      
      <NavLink to="/profile">
      <div className="nav-item">
        <User size={22} />
        <span>Profile</span>
      </div>
      </NavLink>

    </div>
  );
}

export default BottomNavbar;