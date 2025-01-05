import React from 'react'
import { FaMapMarkerAlt, FaPills, FaHandPaper, FaUserMd} from "react-icons/fa";
import { FaSearch,FaBell } from 'react-icons/fa';

const ConnectingBoard = () => {
    const cardData = [
        { icon: <FaMapMarkerAlt />, number: 60, label: "Past Visits" },
        { icon: <FaPills />, number: 34, label: "Medication" },
        { icon: <FaHandPaper />, number: 20, label: "Allergies" },
        { icon: <FaUserMd />, number: 10, label: "Care Team" },
      ];
  return (
    <div className='inner-c'>
     <div className="right-header">
                    <div style={{ width: "40%" }} className="header-left-container">
                        <span className="Title-name">Connecting board</span>
                    </div>
    
                    <div className="header-right-container">
                        <div className="header-bar">
                            {/* Search Input */}
                            <div className="search-container">
                                <FaSearch className="search-icon" />
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search Caring"
                                />
                            </div>
                            {/* Left Button */}
                            <button className="create-plan-btn">Search</button>
    
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
                </div>
    <div className="card-grid">
    {cardData.map((item, index) => (
      <div key={index} className="card">
        <div className="card-icon">{item.icon}</div>
        <div className="card-content">
            <div className="card-number">{item.number}</div>
            <div className="card-label">{item.label}</div>
          </div>
      </div>
    ))}
  </div>
  </div>
  )
}

export default ConnectingBoard
