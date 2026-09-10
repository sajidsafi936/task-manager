import React, { useState, useEffect } from "react";
import "./Notifications.css";
import axios from "axios";

import {
  IoIosArrowBack,
  IoMdChatbubbles,
} from "react-icons/io";

import {
  IoSettingsOutline,
  IoCheckmarkCircleSharp,
  IoCalendarNumber,
  IoDocumentOutline,
} from "react-icons/io5";

import { FaRegBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();

  // Navigate back to dashboard
  const navigateBackArrow = () => {
    navigate("/homedashboard");
  };


  // Notifications state
  const [notifications, setNotifications] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(false);


  // Fetch notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/notifications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Notifications:", response.data);

        setNotifications(response.data);

      } catch (error) {
        console.log("Error fetching notifications:", error);

      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);


  // Delete notification
  const changeNotificationStatus = async (_id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/notifications/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove notification from UI
      setNotifications((previousNotifications) =>
        previousNotifications.filter(
          (notification) => notification._id !== _id
        )
      );

    } catch (error) {
      console.log("Error deleting notification:", error);
    }
  };


  // Format notification time
  const formatNotificationTime = (time) => {
    const notificationTime = new Date(time);
    const now = new Date();

    const difference = now - notificationTime;

    const minutes = Math.floor(
      difference / (1000 * 60)
    );

    const hours = Math.floor(
      difference / (1000 * 60 * 60)
    );

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );


    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    if (hours < 24) {
      return `${hours}h ago`;
    }

    if (days === 1) {
      return "Yesterday";
    }

    return `${days} days ago`;
  };


  // Icons for each notification type
  const notificationIcons = {
    reminder: FaRegBell,
    completed: IoCheckmarkCircleSharp,
    upcoming: IoCalendarNumber,
    added: IoMdChatbubbles,
    report: IoDocumentOutline,
  };


  // Colors for each notification type
  const notificationStyles = {
    reminder: {
      color: "#3B82F6",
      background: "#DBEAFE",
    },

    completed: {
      color: "#10B981",
      background: "#D1FAE5",
    },

    upcoming: {
      color: "#F97316",
      background: "#FED7AA",
    },

    added: {
      color: "#8B5CF6",
      background: "#EDE9FE",
    },

    report: {
      color: "#10B981",
      background: "#D1FAE5",
    },
  };


  // Loading screen
  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <div className="notification-container">

      {/* Header */}
      <div className="notification-header">

        <div className="nofication-arrow">

          <IoIosArrowBack
            size="1.5em"
            onClick={navigateBackArrow}
          />

          <h3>Notifications</h3>

        </div>


        <div>
          <IoSettingsOutline size="1.5em" />
        </div>

      </div>


      {/* Notification List */}
      {notifications.map((notification) => {

        const Icon =
          notificationIcons[notification.type];

        const iconStyle =
          notificationStyles[notification.type];


        return (
          <div
            className="notification-card"
            key={notification._id}
            onClick={() =>
              changeNotificationStatus(notification._id)
            }
          >

            <div className="notification-box">

              {/* Notification Icon */}
              <div className="notification-icon">

                {Icon && (
                  <Icon
                    size="3em"
                    style={{
                      color: iconStyle.color,
                      background: iconStyle.background,
                      borderRadius: "50%",
                      padding: "10px",
                    }}
                  />
                )}

              </div>


              {/* Notification Details */}
              <div className="notification-detail">

                <div className="notification-message">

                  <h3>
                    {notification.title}
                  </h3>

                  <p>
                    {notification.message}
                  </p>

                </div>


                {/* Notification Time */}
                <div className="notification-time">

                  <h6>
                    {formatNotificationTime(
                      notification.time
                    )}
                  </h6>

                </div>

              </div>

            </div>

          </div>
        );
      })}


      {/* No notifications */}
      {notifications.length === 0 && (
        <p className="no-notifications">
          No notifications
        </p>
      )}

    </div>
  );
};

export default Notifications;
