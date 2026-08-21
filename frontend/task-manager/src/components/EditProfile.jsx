import React, { useState } from "react";
import "./EditProfile.css";
import { MdCameraAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import profile from "../assets/profile.png";

const EditProfile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [username, setUsername] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profilePicture, setProfilePicture] = useState(profile);

  const handleChangeName = (e) => {
    setUsername(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePicture = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  const handleSave = async () => {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/users/profile`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: username,
                    email: email,
                }),
            }
        );

        const data = await res.json();

        if (!res.ok) {
            console.error(data.message);
            return;
        }

        // Update user information in localStorage
        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        // Go back to ProfileScreen
        navigate("/profile");

    } catch (err) {
        console.error(err);
    }
};

  return (
    <div className="edit-profile-container">

      <div className="edit-profile-card">

        <div className="edit-profile-header">
          <h2>Edit Profile</h2>
          <p>Update your profile information</p>
        </div>

        {/* Profile Picture */}
        <div className="edit-picture-section">

          <div className="edit-picture-wrapper">

            <img
              src={profilePicture}
              alt="Profile"
              className="edit-profile-picture"
            />

            <label
              htmlFor="profile-picture"
              className="camera-button"
            >
              <MdCameraAlt size={20} />
            </label>

            <input
              type="file"
              id="profile-picture"
              accept="image/*"
              onChange={handleChangePicture}
              hidden
            />

          </div>

          <p>Change profile picture</p>

        </div>

        {/* Name */}
        <div className="form-group">

          <label htmlFor="username">
            Full Name
          </label>

          <input
            type="text"
            id="username"
            value={username}
            onChange={handleChangeName}
            placeholder="Enter your name"
          />

        </div>

        {/* Email */}
        <div className="form-group">

          <label htmlFor="email">
            Email
          </label>

          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChangeEmail}
            placeholder="Enter your email"
          />

        </div>

        {/* Buttons */}
        <div className="edit-profile-buttons">

          <button
            className="cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
};

export default EditProfile;