import React, { useEffect, useState } from 'react';
import logoimage from "../assets/logoimage.svg";
import { FaRegCalendarAlt, FaHandHoldingHeart, FaSearch, FaCog, FaLock } from 'react-icons/fa'; // Icons from react-icons
import { BsHeartPulseFill } from 'react-icons/bs'; // Another icon from react-icons
import { IoIosStats } from 'react-icons/io'; // Stats icon from react-icons
import { TbLogout2 } from "react-icons/tb";
import ConnectingBoard from "./ConnectingBoard"
import Dashboard_left from "./dash-right";
import Sorahealth from "./SoraHealth"


const Dashboard = () => {
    const [activeScreen, setActiveScreen] = useState("Dashboard");
    
    const renderActiveScreen = () => {
        switch (activeScreen) {
          case "Dashboard":
            return <Dashboard_left />;
          case "Sora Health":
            return <Sorahealth />;
          case "Connecting Records":
            return <ConnectingBoard />;
          case "Benefits":
            return <div>Benefits Content</div>; // Placeholder for Benefits screen
          case "Find a Caregiver":
            return <div>Find a Caregiver Content</div>; // Placeholder for Find a Caregiver screen
          case "Setting":
            return <div>Settings Content</div>; // Placeholder for Settings screen
          case "Privacy Policy":
            return <div>Privacy Policy Content</div>; // Placeholder for Privacy Policy screen
          default:
            return <div>Select a section</div>;
        }
      };
    
       return (
        <div className='dash-container'>
            <div className="left-container">
                <div className='dash-logo'>
                    <img className='logo' src={logoimage} alt="" />
                </div>
                <div className="buttons-container">
                    <div className="nav-left-buttons-container">
                        <ul>
                            <li                 onClick={() => setActiveScreen("Dashboard")}
 className="nav-button">
                                <FaRegCalendarAlt  size={20} style={{ marginRight: '10px' }} />
                                Dashboard
                            </li>
                            <li  onClick={() => setActiveScreen("Sora Health")}

 
 className="nav-button">
                                <BsHeartPulseFill size={20} style={{ marginRight: '10px' }} />
                                Sora Health
                            </li>
                            <li  onClick={() => setActiveScreen("Connecting Records")}className="nav-button">
                                <IoIosStats size={20} style={{ marginRight: '10px' }} />
                                Connecting Records
                            </li>
                            <li className="nav-button">
                                <FaHandHoldingHeart size={20} style={{ marginRight: '10px' }} />
                                Benefits
                            </li>
                            <li className="nav-button">
                                <FaSearch size={20} style={{ marginRight: '10px' }} />
                                Find a Caregiver
                            </li>
                        </ul>
                    </div>
                    <div className="nav-bottom-buttons-container">
                        <ul>
                            <li className="nav-button">
                                <FaCog size={20} style={{ marginRight: '10px' }} />
                                Setting
                            </li>
                            <li className="nav-button">
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
               {renderActiveScreen()}
            </div>

        </div>
    )
}

export default Dashboard;
 
