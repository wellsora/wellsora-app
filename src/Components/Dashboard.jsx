import React, { useState } from 'react';
import logoimage from "../assets/logoimage.svg";
import { FaRegCalendarAlt, FaHandHoldingHeart, FaSearch, FaCog, FaLock } from 'react-icons/fa'; // Icons from react-icons
import { BsHeartPulseFill } from 'react-icons/bs'; // Another icon from react-icons
import { IoIosStats } from 'react-icons/io'; // Stats icon from react-icons
import { TbLogout2 } from "react-icons/tb";
import ConnectingBoard from "./ConnectingBoard";
import Dashboard_left from "./dash-right";
import Sorahealth from "./SoraHealth";
import Privacy from './Privacy';
import Benefits from './Benefits';
import { Caregiver } from './Caregiver';
import Settings from "./Settings"

const Dashboard = () => {
    const [activeScreen, setActiveScreen] = useState("Connecting Records");

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

    return (
        <div className='dash-container'>
            <div className="left-container">
                <div className='dash-logo'>
                    <img className='logo' src={logoimage} alt="" />
                </div>
                <div className="buttons-container">
                    <div className="nav-left-buttons-container">
                        <ul>
                            <li onClick={() => setActiveScreen("Dashboard")} className={`nav-button ${isActive("Dashboard")}`}>
                                <FaRegCalendarAlt size={20} style={{ marginRight: '10px' }} />
                                Dashboard
                            </li>
                            <li onClick={() => setActiveScreen("Sora Health")} className={`nav-button ${isActive("Sora Health")}`}>
                                <BsHeartPulseFill size={20} style={{ marginRight: '10px' }} />
                                Sora Health
                            </li>
                            <li onClick={() => setActiveScreen("Connecting Records")} className={`nav-button ${isActive("Connecting Records")}`}>
                                <IoIosStats size={20} style={{ marginRight: '10px' }} />
                                Connecting Records
                            </li>
                            <li onClick={() => setActiveScreen("Benefits")} className={`nav-button ${isActive("Benefits")}`}>
                                <FaHandHoldingHeart size={20} style={{ marginRight: '10px' }} />
                                Benefits
                            </li>
                            <li onClick={() => setActiveScreen("Find a Caregiver")} className={`nav-button ${isActive("Find a Caregiver")}`}>
                                <FaSearch size={20} style={{ marginRight: '10px' }} />
                                Find a Caregiver
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
                {renderActiveScreen()}
            </div>
        </div>
    );
};

export default Dashboard;
