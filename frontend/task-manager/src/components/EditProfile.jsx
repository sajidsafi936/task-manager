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

  // Show saved profile picture if user already has one
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture || profile
  );

  // Store the actual selected image file
  const [selectedFile, setSelectedFile] = useState(null);

  const [saving, setSaving] = useState(false);


  // ============================
  // NAME
  // ============================

  const handleChangeName = (e) => {
    setUsername(e.target.value);
  };


  // ============================
  // EMAIL
  // ============================

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };


  // ============================
  // PROFILE PICTURE
  // ============================

  const handleChangePicture = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Keep the actual file
      setSelectedFile(file);

      // Create preview
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
    }
  };


  // ============================
  // CANCEL
  // ============================

  const handleCancel = () => {
    navigate("/profile");
  };


  // ============================
  // SAVE PROFILE
  // ============================

  const handleSave = async () => {
    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      /*
        If a new picture was selected,
        we will send the image using FormData.
      */

      const formData = new FormData();

      formData.append("name", username);
      formData.append("email", email);

      if (selectedFile) {
        formData.append("profilePicture", selectedFile);
      }


      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/profile`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );


      const data = await res.json();


      if (!res.ok) {
        console.error(data.message);
        return;
      }


      // Save updated user information
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );


      // Return to profile
      navigate("/profile");

    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="edit-profile-container">

      <div className="edit-profile-card">

        {/* HEADER */}

        <div className="edit-profile-header">

          <h2>Edit Profile</h2>

          <p>
            Update your profile information
          </p>

        </div>


        {/* PROFILE PICTURE */}

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

          <p>
            Change profile picture
          </p>

        </div>


        {/* NAME */}

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


        {/* EMAIL */}

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


        {/* BUTTONS */}

        <div className="edit-profile-buttons">

          <button
            className="cancel-btn"
            onClick={handleCancel}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default EditProfile;