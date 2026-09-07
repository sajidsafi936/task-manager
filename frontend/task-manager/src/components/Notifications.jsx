import React from 'react'
import "./Notifications.css";
import { IoIosArrowBack, IoMdChatbubbles } from "react-icons/io";
import { IoSettingsOutline, IoCheckmarkCircleSharp, IoCalendarNumber, IoDocumentOutline } from "react-icons/io5";
import {useNavigate} from 'react-router-dom'
import { FaRegBell } from "react-icons/fa";

const Notifications = () => {
  const navigate = useNavigate();
  const navigateBackArrow = () =>{
    navigate("/homedashboard")
  }
  return (
    <div className='notification-container'>
      <div className="notification-header">
        <div className='nofication-arrow'>
          <IoIosArrowBack size="1.5em" onClick={navigateBackArrow}/>
          <h3>Notifications</h3>
          </div>
        <div>
          <IoSettingsOutline size="1.5em" />
        </div>
      </div>

      <div className="notification-card">
        <div className="notification-box">
          <div className='notification-icon'>
            <FaRegBell size="3em" style={{color: "#3B82F6",background: "#DBEAFE", borderRadius: "50%", padding: "10px"}}/>
          </div>
          <div className="notification-detail">
            <div className='notification-message'>
              <h3>Task Reminder</h3>
              <p>Design Landing page is due tomorrow at 10:00 AM</p>
            </div>
            <div className="notification-time">
              <h4>2h ago</h4>
            </div>
          </div>
        </div>
      </div>


      <div className="notification-card">
        <div className="notification-box">
          <div className='notification-icon'>
            <IoCheckmarkCircleSharp size="3em" style={{color: "#10B981",background: "#D1FAE5", borderRadius: "50%", padding: "10px"}}/>
          </div>
          <div className="notification-detail">
            <div className='notification-message'>
              <h3>Task Completed</h3>
              <p>Design Landing page is due tomorrow at 10:00 AM</p>
            </div>
            <div className="notification-time">
              <h4>2h ago</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="notification-card">
        <div className="notification-box">
          <div className='notification-icon'>
            <IoCalendarNumber size="3em" style={{color: "#F97316",background: "#FED7AA", borderRadius: "50%", padding: "10px"}}/>
          </div>
          <div className="notification-detail">
            <div className='notification-message'>
              <h3>Upcomming Tasks</h3>
              <p>Design Landing page is due tomorrow at 10:00 AM</p>
            </div>
            <div className="notification-time">
              <h4>2h ago</h4>
            </div>
          </div>
        </div>
      </div>


      <div className="notification-card">
        <div className="notification-box">
          <div className='notification-icon'>
            <IoMdChatbubbles size="3em" style={{color: "#8B5CF6",background: "#EDE9FE", borderRadius: "50%", padding: "10px"}}/>
          </div>
          <div className="notification-detail">
            <div className='notification-message'>
              <h3>New Comment</h3>
              <p>Design Landing page is due tomorrow at 10:00 AM</p>
            </div>
            <div className="notification-time">
              <h4>2h ago</h4>
            </div>
          </div>
        </div>
      </div>



      <div className="notification-card">
        <div className="notification-box">
          <div className='notification-icon'>
            <IoDocumentOutline  size="3em" style={{color: "#10B981",background: "#D1FAE5", borderRadius: "50%", padding: "10px"}}/>
          </div>
          <div className="notification-detail">
            <div className='notification-message'>
              <h3>Weekly Report</h3>
              <p>Design Landing page is due tomorrow at 10:00 AM</p>
            </div>
            <div className="notification-time">
              <h4>2h ago</h4>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Notifications
