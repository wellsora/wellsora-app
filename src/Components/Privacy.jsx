import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import "../App.css";
import { HiDotsVertical } from "react-icons/hi";
import "../App.css";
import ConnectingBoard from "./ConnectingBoard";
import Dashboard_left from "./dash-right";
import Sorahealth from "./SoraHealth";
import Benefits from './Benefits';
import { Caregiver } from './Caregiver';
import Settings from "./Settings"
import { FaRegCalendarAlt, FaHandHoldingHeart, FaSearch, FaCog, FaLock } from 'react-icons/fa'; // Icons from react-icons
import { BsHeartPulseFill } from 'react-icons/bs'; // Another icon from react-icons
import { IoIosStats } from 'react-icons/io'; // Stats icon from react-icons
import { TbLogout2 } from "react-icons/tb";
import { Link } from 'react-router-dom'; 


const policyText = `
Privacy Policy:

We are committed to protecting your privacy. This privacy policy outlines how we collect, use, and safeguard your personal information. By using our services, you agree to the collection and use of information in accordance with this policy.

Information Collection:
We collect various types of information for different purposes to provide and improve our services to you.

Data Usage:
The collected data is used to personalize your experience, improve our website, and provide customer support.

Data Sharing:
We do not share your personal information with third parties without your consent, except as required by law.

Security:
We employ security measures to ensure the safety of your personal information.

Changes to the Policy:
We may update our privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
`;

const Privacy = () => {
  const [isColored, setIsColored] = useState(false);
  const [activeScreen, setActiveScreen] = useState("Privacy Policy");

  const renderActiveScreen = () => {
      switch (activeScreen) {
          case "Dashboard":
              return <Dashboard_left />;
          case "Sora Health":
              return <Sorahealth />;
          case "Connecting Records":
              return <ConnectingBoard />;
          case "Benefits":
              return <Benefits />;
          case "Find a Caregiver":
              return <Caregiver/>;
          case "Setting":
              return <Settings/>;
          case "Privacy Policy":
              return <Privacy />;
          default:
              return <div>Select a section</div>;
      }
  };

  // Function to check if the button is the active one
  const isActive = (screen) => activeScreen === screen ? 'active-button' : '';

  // Inline styles
  const defaultStyle = {
    backgroundColor: "#f0f0f0",
    width: "20px",
    height: "20px",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    marginRight: "10px", // Space between checkbox and text
  };
  const defaultStyle2 = {
    backgroundColor: "#f0f0f0",
    width: "20px",
    height: "20px",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    marginRight: "10px", // Space between checkbox and text
  };

  const coloredStyle = {
    ...defaultStyle,
    backgroundColor: "#007b9e",
    color: "white",
  };

  const handleClick = () => {
    setIsColored((prev) => !prev);
  };
  const containerStyle = {
    padding: "20px",
    borderRadius: "8px",
    color: "white", // Text color white for readability on the blue background
  };

  const headingStyle = {
    color: "#007b9e", // Set heading color to blue
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px", // Spacing below headings
  };

  const sectionHeadingStyle = {
    color: "#007b9e", // Blue for section headings
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "15px", // Space before each section heading
    marginBottom: "15px", // Space after each section heading
  };

  const policyContainerStyle = {
    maxHeight: "30em", // Set maximum height for scrollable content
    overflowY: "auto", // Enable vertical scrolling
    marginTop: "10px",

    padding: "2% ",
    borderRadius: "4px",
    color: "#333", // Darker text color for readability
  };

  return (
            <div className='dash-container'>
                <div className="left-container">
                    <div className='dash-logo'>
                        {/* <img className='logo' src={logoimage} alt="" /> */}
                    </div>
                    <div className="buttons-container">
                    <div className="nav-left-buttons-container">
  <ul>
    <li className={`nav-button ${isActive("Dashboard")}`}>
      <Link to="/" className="nav-link">
        <FaRegCalendarAlt size={20} style={{ marginRight: '10px' }} />
        Dashboard
      </Link>
    </li>
    <li className={`nav-button ${isActive("Sora Health")}`}>
      <Link to="/sorahealth" className="nav-link">
        <BsHeartPulseFill size={20} style={{ marginRight: '10px' }} />
        Sora Health
      </Link>
    </li>
    <li className={`nav-button ${isActive("Connecting Records")}`}>
      <Link to="/connectingrecords" className="nav-link">
        <IoIosStats size={20} style={{ marginRight: '10px' }} />
        Connecting Records
      </Link>
    </li>
    <li className={`nav-button ${isActive("Benefits")}`}>
      <Link to="/benefits" className="nav-link">
        <FaHandHoldingHeart size={20} style={{ marginRight: '10px' }} />
        Benefits
      </Link>
    </li>
    <li className={`nav-button ${isActive("Find a Caregiver")}`}>
      <Link to="/findcaregiver" className="nav-link">
        <FaSearch size={20} style={{ marginRight: '10px' }} />
        Find a Caregiver
      </Link>
    </li>
  </ul>
</div>
                        <div className="nav-bottom-buttons-container">
                            <ul style={{padding: "20px"}}>
                                <li onClick={() => setActiveScreen("Setting")}  className={`nav-button ${isActive("Setting")}`}>
                                    <FaCog size={20} style={{ marginRight: '10px' }} />
                                    Setting
                                </li>
                                <li onClick={() => setActiveScreen("Privacy Policy")} className={`nav-button ${isActive("Privacy Policy")}`}>
                                    <FaLock size={20} style={{ marginRight: '10px' }} />
                                    Privacy Policy
                                </li>
                                <li className="nav-button">
                                    <TbLogout2 size={20} style={{ marginRight: '10px' }} />
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
    
                <div className="right-container">
            
      <div style={{ gap: "38em" }} className="right-header">
        <div style={{ width: "26%" }} className="header-left-container">
          <span style={{ fontWeight: "800" }} className="name">
            Privacy Policy
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            gap: "20px",
            width: "15%",
          }}
          className="header-right-container"
        >
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
            <HiDotsVertical style={50} />
          </div>
        </div>
      </div>
      <div className="right-content" style={containerStyle}>
        <div style={policyContainerStyle}>
          <h3 style={sectionHeadingStyle}>Introduction</h3>
          <p style={{ width: "60em", textAlign: "justify" }}>{policyText}</p>

          <h3 style={sectionHeadingStyle}>Information Collection</h3>
          <p>
            We collect various types of information for different purposes to
            provide and improve our services to you.
          </p>

          <h3 style={sectionHeadingStyle}>Data Usage</h3>
          <p>
            The collected data is used to personalize your experience, improve
            our website, and provide customer support.
          </p>

          <h3 style={sectionHeadingStyle}>Data Sharing</h3>
          <p>
            We do not share your personal information with third parties without
            your consent, except as required by law.
          </p>

          <h3 style={sectionHeadingStyle}>Security</h3>
          <p>
            We employ security measures to ensure the safety of your personal
            information.
          </p>

          <h3 style={sectionHeadingStyle}>Changes to the Policy</h3>
          <p>
            We may update our privacy policy from time to time. We will notify
            you of any changes by posting the new policy on this page.
          </p>
        </div>
      </div>
      <div
        className="check-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          position: "absolute",
          bottom: 0,
          padding: "20px",
          paddingLeft: "46px",
        }}
      >
        {/* Checkbox and Label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingleft: " 20px ",
          }}
        >
          <div
            style={isColored ? coloredStyle : defaultStyle}
            onClick={handleClick}
          >
            {isColored && "✔"}
          </div>
          <span>
            I confirm that I have read and accept the terms and conditions and
            privacy policy.
          </span>
        </div>

        {/* Buttons */}
        </div>
        </div>
        
              </div>
  
  );
};

export default Privacy;
