import React from 'react'
import { FaBell } from 'react-icons/fa';
import { FiSearch } from "react-icons/fi";

import "../App.css"

const Benefits = () => {
      
  return (
  <>
   <div style={{gap:"38em"}} className="right-header">
                      <div style={{width:"26%"}} className="header-left-container">
                          <span style={{fontWeight:"800"}} className="name">Your personalized benefits</span>
                      </div>
                      <div style={{display: 'flex',alignItems: 'center', alignContent: 'center',  justifyContent: 'center',  gap: '20px', width:"15%"}} className="header-right-container">
                             {/* Notification Icon */}
                               <div className="notification-icon">
                                   <FaBell />
                               </div>
                             {/* Profile Section */}
                              <div className="profile-container">
                                  <img
                                      src="https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197908.png"
                                      alt="User Profile"
                                      className="profile-picture"
                                  />
                                  <div className="profile-info">
                                      <span className="profile-name">First Name</span>
                                      <span className="profile-link">View Profile</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", padding: "30px 78px" }}>
      {/* Search Input with Icon */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginRight: "10px",
          backgroundColor: "#EFF8FC",
        }}
      >
        <FiSearch style={{ marginRight: "10px", color: "#888" }} />
        <input
          type="text"
          placeholder="Search procedures, treatments or services..."
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: "14px",
            backgroundColor: "#EFF8FC",
          }}
        />
      </div>

      {/* Button */}
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#1B779B", // Adjust color to match the design
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Connecting Medical Records
      </button>
    </div>
    <div className="main-div" style={{ display: "flex" }}>
  {/* Left Section */}
  <div className="left" style={{ flex: 1, paddingRight: "10px", border: "1px solid lightgray" }}>
    <div style={{ padding: "20px", backgroundColor: " #EFF8FC", borderRadius: "8px", margin: "80px" ,marginTop:"22px"}}>
      {/* Title */}
      <div style={{ marginBottom: "20px" ,marginTop:"25px"}}>
        <h4 style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#333" }}>
          Main Categories
        </h4>
        <div
          style={{
            width: "124px",
            height: "2px",
            backgroundColor: "#1B779B",
            marginTop: "5px",
          }}
        ></div>
        
      </div>
    
      {/* Checkbox with Label */}
     
    </div>
    <div style={{ display: "flex", alignItems: "flex-start", margin:"82px",marginTop:"-58px", marginLeft:"100px" }}>
        {/* Checkbox */}
        <input
          type="checkbox"
          id="docsmov-services"
          style={{
            marginTop: "3px",
            marginRight: "10px",
            accentColor: "rgb(27, 119, 155)"
          }}
        />
        {/* Label and Description */}
        <div>
          <label
            htmlFor="docsmov-services"
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#333",
              cursor: "pointer",
            }}
          >
            Docsmov Services
          </label>
          <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#555" }}>
            Welcome Visit – Screenings – Wellness Visits
          </p>
        </div>
      </div>
  </div>

  {/* Right Section */}
  <div className="right" style={{ minHeight:"518px",border:"1px solid lightgrey",borderBottom:"none",minWidth: "35%", }}>
    {/* Add content for the right section here */}
  </div>
</div>

  </>
  )
}

export default Benefits
