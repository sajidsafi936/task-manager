import React from 'react'
import "./HomeDashboard.css";
import notification from "../assets/notification.png"
import profile from "../assets/profile.png"
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaTasks} from "react-icons/fa";
import { SiGoogletasks } from 'react-icons/si';
import { MdPendingActions } from "react-icons/md";
import { TbCalendarDue } from "react-icons/tb";
import { PiGreaterThan } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import BottomNavbar from "./BottomNavbar"

const HomeDashboard = () => {
  return (
    <div>
      <div className='header'>
        <div className="greeting">
          <p>Good Morning</p>
          <h2>Sajid 👋</h2>
        </div>
        <div className="notification-profile">
            <IoMdNotificationsOutline size='2em' style={{marginBottom: '4px', marginRight: '16px' }}/>
            <img className='header-img' id='profile-img' src={profile} alt="profile-img" />
        </div>
      </div>


      <div className='search'>
         <FiSearch className="search-icon" />

        <input
        type="search"
        placeholder="Search tasks..."
        />
      </div>



      {/* //dashboard summary */}
      <div className="dashboard-summary">
        <div className="stat-card" id='total-tasks'>
          <FaTasks size='2em' />
          <div className='stat-info'>
            <p>Total Tasks</p>
            <h3>24</h3>
          </div>      
        </div>

        <div className="stat-card" id='completed'>
          <SiGoogletasks size='2em' />
          <div className='stat-info'>
            <p>Completed</p>
            <h3>16</h3>
          </div> 
        </div>

        <div className="stat-card" id='pending'>
          <MdPendingActions size='2em' />
          <div className='stat-info'>
            <p>Pending</p>
            <h3>6</h3>
          </div> 
        </div>

        <div className="stat-card" id='overdue'>
          <TbCalendarDue size='2em' />
          <div className='stat-info'>
            <p>Overdue</p>
            <h3>2</h3>
          </div> 
        </div>
      </div>





      <div className="task-catagories">
      <div className="task-heading">
        <div className="todays-task">
          Today's Tasks
        </div>
        <div className="see-all">See all</div>
      </div>

      
        <div className="task-list">
          <div className="task-card">
            <input type="checkbox" />

            <div className="task-info">
              <h3>Learn React</h3>
              <p>Today, 10:00 AM</p>
            </div>

            <div className="task-right">
            <span className="priority-high">• High</span>
            <span className="arrow"><PiGreaterThan/></span>
            </div>
          </div>

          <div className="task-card">
          <input type="checkbox" />

          <div className="task-info">
            <h3>Build Task Manager App</h3>
            <p>Today, 02:00 PM</p>
          </div>

          <div className="task-right">
            <span className="priority-medium">• Medium</span>
            <span className="arrow"><PiGreaterThan/></span>
          </div>
          </div>

          <div className="task-card">
          <input type="checkbox" />

          <div className="task-info">
            <h3>Database Assignment</h3>
            <p>Today, 05:00 PM</p>
          </div>

          <div className="task-right">
            <span className="priority-low">• Low</span>
            <span className="arrow"><PiGreaterThan/></span>
          </div>
          </div>
        </div>
        </div>
          <BottomNavbar/>

    </div>
  )
}

export default HomeDashboard;
