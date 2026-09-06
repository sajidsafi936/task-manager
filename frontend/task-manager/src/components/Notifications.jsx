import React from 'react'
import "./Notifications.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

const Notifications = () => {
  return (
    <div className='notification-container'>
      <div className="notification-header">
        <div className='nofication-arrow'>
          <IoIosArrowBack size="1.5em"/>
          <h3>Notifications</h3>
          </div>
        <div>
          <IoSettingsOutline size="1.5em" />
        </div>
      </div>

      <div className="notification-card">hi</div>
      <div className="notification-card">hi</div>
      <div className="notification-card">hi</div>
      <div className="notification-card">hi</div>
      
    </div>
  )
}

export default Notifications
