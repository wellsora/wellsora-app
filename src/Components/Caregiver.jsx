import React, { useEffect, useState, useRef } from "react";
import {  FaBell, FaHeartbeat } from "react-icons/fa";
import Modal from "./Modal";
import { HiDotsVertical } from "react-icons/hi";
import { FaRegCalendarAlt, FaHandHoldingHeart, FaSearch, FaCog, FaLock } from 'react-icons/fa'; // Icons from react-icons
import { BsHeartPulseFill } from 'react-icons/bs'; // Another icon from react-icons
import { IoIosStats } from 'react-icons/io'; // Stats icon from react-icons
import { TbLogout2 } from "react-icons/tb";
import ConnectingBoard from "./ConnectingBoard";
import Dashboard_left from "./dash-right";
import Sorahealth from "./SoraHealth";
import Privacy from './Privacy';
import Benefits from './Benefits';
import Settings from "./Settings"
import { Link } from 'react-router-dom'; 
import logoimage from "../assets/logoimage.svg";
import img from "../assets/image.png"

export const Caregiver = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
  });
  const [activeScreen, setActiveScreen] = useState("Find a Caregiver");

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

  // Handle selecting an option for each question
  const handleOptionSelect = (question, option) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [question]: option, // Update the selected option for the specified question
    }));
  };
  const handleNextClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Set current date on component mount
  useEffect(() => {
    const date = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    setCurrentDate(date.toLocaleDateString("en-US", options));
  }, []);

  // Handle create plan button click
  const handleCreateClick = () => setModalVisible(true);

  return (
      <div className='dash-container'>
                <div className="left-container">
                    <div className='dash-logo'>
                        {/* <img className='logo' src={logoimage} alt="" /> */}
                        <span className="logo">Wellsora</span>
                    </div>
                    <div className="buttons-container">
                                    <div className="nav-left-buttons-container">
                   <ul>
                          <Link to="/" className="nav-link">
                        <li className={`nav-button ${isActive("Dashboard")}`}>
                            <FaRegCalendarAlt size={20} style={{ marginRight: '10px' }} />
                            Dashboard
                        </li>
                          </Link>
                          <Link to="/sorahealth" className="nav-link">
                        <li className={`nav-button ${isActive("Sora Health")}`}>
                            <BsHeartPulseFill size={20} style={{ marginRight: '10px' }} />
                            Sora Health
                        </li>
                          </Link>
                          <Link to="/connectingrecords" className="nav-link">
                        <li className={`nav-button ${isActive("Connecting Records")}`}>
                            <IoIosStats size={20} style={{ marginRight: '10px' }} />
                            Connecting records
                        </li>
                          </Link>
                          <Link to="/benefits" className="nav-link">
                        <li className={`nav-button ${isActive("Benefits")}`}>
                            <FaHandHoldingHeart size={20} style={{ marginRight: '10px' }} />
                            Benefits
                        </li>
                          </Link>
                          <Link to="/findcaregiver" className="nav-link">
                        <li className={`nav-button ${isActive("Find a Caregiver")}`}>
                            <FaSearch size={20} style={{ marginRight: '10px' }} />
                            Find a caregiver
                        </li>
                          </Link>
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
    
                <div className="right-header">
                    <div className="header-left-container">
                        <span className="name">Find a caregiver</span>
                        
                    </div>
                    <div className="header-right-container">
                        <div className="header-bar">
                            {/* Left Button */}

                            {/* Search Input */}
                            {/* <div className="search-container">
                                <FaSearch className="search-icon" />
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="search activity"
                                />
                            </div> */}

                            {/* Notification Icon */}
                            <div className="notification-icon">
                                <FaBell />
                            </div>


                            {/* Profile Section */}
                            <div className="profile-container">
                                <img
                                    src={img}
                                    alt="User Profile"
                                    className="profile-picture"
                                /><HiDotsVertical style={50} />
                            </div>
                        </div>
                    </div>
                </div>

      <div className="maincargiver">
       
        

        <div className="question-container">
          {/* Question 1 */}
          <div className="question">
            <div className="question-content">
              <span className="number-q">01</span>
              <div className="main-question">
                <div className="question-text">
                  <span>
                    What kind of support do you and your family member require?
                  </span>
                  <span className="text2">Select one of the below options</span>
                </div>
              </div>
            </div>

            <div className="options">
              {[
                "Daily Chores",
                "Emotional Support",
                "Travel Assistance",
                "Movement Support",
                "Advanced Care",
                "Other",
              ].map((option) => (
                <button
                  key={option}
                  className={`option-button ${
                    selectedOptions.question1 === option ? "selected" : ""
                  }`}
                  onClick={() => handleOptionSelect("question1", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="question">
            <div className="question-content">
              <span className="number-q">02</span>
              <div className="main-question">
                <div className="question-text">
                  <span>
                    When do you or your family member require support?
                  </span>
                  <span className="text2">
                    Choose the timeframe that best fits your situation
                  </span>
                </div>
              </div>
            </div>

            <div className="options">
              {[
                "Immediately",
                "Within a week",
                "Just Exploring",
                "In the next month or more",
                "Other",
              ].map((option) => (
                <button
                  key={option}
                  className={`option-button ${
                    selectedOptions.question2 === option ? "selected" : ""
                  }`}
                  onClick={() => handleOptionSelect("question2", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="short-questions">
            {/* Question 3 */}
            <div className="question">
              <div className="question-content">
                <span className="number-q">03</span>
                <div className="main-question">
                  <div className="question-text">
                    <span>
                      What level of assistance is required for you?                    </span>
                    <span className="text2">Please select an option</span>
                  </div>
                </div>
              </div>

              <div className="options">
                {[
                  "Long-Term Support",
                  "Short-Term Help",
                  "Live-In Care",
                  "Other",
                ].map((option) => (
                  <button
                    key={option}
                    className={`option-button ${
                      selectedOptions.question3 === option ? "selected" : ""
                    }`}
                    onClick={() => handleOptionSelect("question3", option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 4 */}
            <div className="question">
              <div className="question-content">
                <span className="number-q">04</span>
                <div className="main-question">
                  <div className="question-text">
                    <span>What is your preferred payment method?</span>
                    <span className="text2">Please select an option</span>
                  </div>
                </div>
              </div>

              <div className="options">
                {[
                  "Self Pay",
                  "Your Insurance",
                  "Medicaid",
                  "Other Method",
                ].map((option) => (
                  <button
                    key={option}
                    className={`option-button ${
                      selectedOptions.question4 === option ? "selected" : ""
                    }`}
                    onClick={() => handleOptionSelect("question4", option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Final Button */}
      <div className="final-button">
        <button onClick={handleCreateClick} className="next-button">
          Next
        </button>
      </div>
      {isModalVisible && (
        <div className="modal-overlay">
          <div className="img-absolute">
            <svg
              width="96"
              height="122"
              viewBox="0 0 96 122"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M114.412 -24C127.912 -24 139.219 -18.9981 148.331 -8.99444C157.444 1.00926 162 12.9056 162 26.6944C162 29.1278 161.865 31.5273 161.595 33.8931C161.325 36.2588 160.852 38.5907 160.178 40.8889H109.552L95.7825 20.2056C95.1075 19.1241 94.1625 18.2454 92.9475 17.5694C91.7325 16.8935 90.45 16.5556 89.1 16.5556C87.345 16.5556 85.7588 17.0963 84.3412 18.1778C82.9238 19.2593 81.945 20.6111 81.405 22.2333L70.47 55.0833L63.3825 44.5389C62.7075 43.4574 61.7625 42.5787 60.5475 41.9028C59.3325 41.2269 58.05 40.8889 56.7 40.8889H1.8225C1.1475 38.5907 0.675 36.2588 0.405 33.8931C0.135 31.5273 0 29.1954 0 26.8972C0 12.9731 4.5225 1.00926 13.5675 -8.99444C22.6125 -18.9981 33.885 -24 47.385 -24C53.865 -24 59.9738 -22.7157 65.7113 -20.1472C71.4488 -17.5787 76.545 -13.9963 81 -9.4C85.32 -13.9963 90.3487 -17.5787 96.0863 -20.1472C101.824 -22.7157 107.933 -24 114.412 -24ZM81 122C78.57 122 76.2412 121.561 74.0137 120.682C71.7862 119.803 69.795 118.485 68.04 116.728L13.77 62.1806C12.96 61.3694 12.2175 60.5583 11.5425 59.7472C10.8675 58.9361 10.1925 58.0574 9.5175 57.1111H52.245L66.015 77.7944C66.69 78.8759 67.635 79.7546 68.85 80.4305C70.065 81.1065 71.3475 81.4444 72.6975 81.4444C74.4525 81.4444 76.0725 80.9037 77.5575 79.8222C79.0425 78.7407 80.055 77.3889 80.595 75.7667L91.53 42.9167L98.415 53.4611C99.225 54.5426 100.238 55.4213 101.452 56.0972C102.668 56.7731 103.95 57.1111 105.3 57.1111H152.28L150.255 59.5444L148.23 61.9778L93.7575 116.728C92.0025 118.485 90.045 119.803 87.885 120.682C85.725 121.561 83.43 122 81 122Z"
                fill="#4CA7A8"
                fill-opacity="0.12"
              />
            </svg>
          </div>
          <div className="modal-content">
            <div className="modal-header">
              <FaHeartbeat
                size={40}
                style={{ color: "#EA7551", fontSize: "1em" }}
              />
            </div>
            <h2>Thank You</h2>
            <div className="para-text">
              <p>
                Thank you for submitting. We will contact you with caregiver
                details.
              </p>
            </div>
            <button onClick={handleCloseModal} className="close-btn">
              Ok
            </button>
          </div>
        </div>
      )}
     </div>
     </div>
  );
};
