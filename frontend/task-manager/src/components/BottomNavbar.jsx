import "./BottomNavbar.css"
import AddTask from "./AddTask";
import { Link, useNavigation } from "react-router-dom";
import ProfileScreen from "./ProfileScreen.jsx";
import TaskCalendar from "./TaskCalendar.jsx";

import {
  House,
  Calendar,
  Plus,
  ChartLine,
  User,
} from "phosphor-react";

function BottomNavbar() {
  return (
    <div className="bottom-nav">

      <div className="nav-item active">
        <House size={22} weight="fill" />
        <span>Home</span>
      </div>

      <Link to='/TaskCalendar'>
        <div className="nav-item">
        <Calendar size={22} />
        <span>Calendar</span>
      </div>
      </Link>

      <button className="add-btn">
        <Link to='/AddTask'>
        <Plus size={28} weight="bold" />        
        </Link>
        
      </button>

      <div className="nav-item">
        <ChartLine size={22} />
        <span>Progress</span>
      </div>
      <Link to="/profile">
      <div className="nav-item">
        <User size={22} />
        <span>Profile</span>
      </div>
      </Link>

    </div>
  );
}

export default BottomNavbar;