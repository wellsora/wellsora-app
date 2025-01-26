import React, { useEffect } from "react";
import { FaBell, FaWheelchair } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import "../App.css";
import ConnectingBoard from "./ConnectingBoard";
import Dashboard_left from "./dash-right";
import Sorahealth from "./SoraHealth";
import Privacy from "./Privacy";
import { Caregiver } from "./Caregiver";
import Settings from "./Settings";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import logoimage from "../assets/logoimage.svg";
import img from "../assets/image.png"
import {
  FaRegCalendarAlt,
  FaHandHoldingHeart,
  FaSearch,
  FaCog,
  FaLock,
} from "react-icons/fa"; // Icons from react-icons
import { BsHeartPulseFill } from "react-icons/bs"; // Another icon from react-icons
import { IoIosStats } from "react-icons/io"; // Stats icon from react-icons
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";

const categoryIcons = {
  "Cancer & Specialized Screenings": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M6 18h8"></path>
      <path d="M3 22h18"></path>
      <path d="M14 22a7 7 0 1 0 0-14h-1"></path>
      <path d="M9 14h2"></path>
      <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"></path>
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"></path>
    </svg>
  ),
  "Therapies & Rehabilitation": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m6.5 6.5 11 11"></path>
      <path d="m21 21-1-1"></path>
      <path d="m3 3 1 1"></path>
      <path d="m18 22 4-4"></path>
      <path d="m2 6 4-4"></path>
      <path d="m3 10 7-7"></path>
      <path d="m14 21 7-7"></path>
    </svg>
  ),
  "Diabetes Care": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path>
    </svg>
  ),
  "Diagnostic & Laboratory Services": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"></path>
      <path d="M8.5 2h7"></path>
      <path d="M7 16h10"></path>
    </svg>
  ),
  "Medical Equipment & Supplies": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
      <circle cx="20" cy="10" r="2"></circle>
    </svg>
  ),
  "Medications & Prescription Support": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M10.5 2h3"></path>
      <path d="M12 14v-4"></path>
      <path d="M12 14v4"></path>
      <path d="M8 14h8"></path>
      <path d="M7 4h10"></path>
      <path d="M17 6.8v5.7c0 .3-.1.5-.3.7L12 18l-4.7-4.8c-.2-.2-.3-.4-.3-.7V6.8c0-.3.1-.5.3-.7l3.8-3.9c.5-.5 1.4-.5 1.9 0l3.7 3.9c.2.2.3.4.3.7z"></path>
    </svg>
  ),
  "Mental Health Services": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M10 3.2C5.7 4 2.8 6.9 2 11.2"></path>
      <path d="M21.2 18c-1.4 2.4-3.8 4.1-6.6 4.7"></path>
      <path d="M15.3 3.3c3.7 1.2 6.5 4.2 7.4 8.1"></path>
      <path d="M2.8 18c1 1.7 2.4 3.2 4.1 4.1"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  ),
  "Preventive & Screening Services": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
    </svg>
  ),
  "Surgical & Treatment Services": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m14.5 4-2-2-2 2"></path>
      <path d="M8.5 8H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-4.5"></path>
      <path d="M12 4v16"></path>
      <path d="M8 12h8"></path>
      <path d="M8.5 8a4 4 0 0 1-4-4"></path>
      <path d="M15.5 8a4 4 0 0 0 4-4"></path>
    </svg>
  ),
  "Substance Use & Pain Management": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M18 12H6"></path>
      <path d="M6 12v9"></path>
      <path d="M18 12v9"></path>
      <path d="M8 15h8"></path>
      <path d="M8 18h8"></path>
      <path d="M12 12V3"></path>
      <path d="M8 5h8"></path>
    </svg>
  ),
  Vaccines: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <path d="M22 4 12 14.01l-3-3"></path>
    </svg>
  ),
  "Palliative & Long-term Care": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8"></path>
      <path d="M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"></path>
    </svg>
  ),
  "Miscellaneous Services": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="19" cy="12" r="1"></circle>
      <circle cx="5" cy="12" r="1"></circle>
    </svg>
  ),
  "Other Benefits": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 12h8"></path>
      <path d="M12 16h8"></path>
    </svg>
  ),
};

const Benefits = () => {
  const [isModalOpen, setModalOpen] = useState(false); // Connect Insurance Modal
  const [isInsuranceChosen, setInsuranceChosen] = useState(false); // Choose Insurance Modal
  const [selectedInsurance, setSelectedInsurance] = useState(null); // Store selected insurance
  const [benefits, setBenefits] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [apiResult, setApiResult] = useState(""); // State to store the API
  const [activeScreen, setActiveScreen] = useState("Benefits");

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
        return <Caregiver />;
      case "Setting":
        return <Settings />;
      case "Privacy Policy":
        return <Privacy />;
      default:
        return <div>Select a section</div>;
    }
  };

  // Function to check if the button is the active one
  const isActive = (screen) => (activeScreen === screen ? "active-button" : "");
  // const openModal = () => setModalOpen(true);
  // const closeModal = () => setModalOpen(false);
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [modalState, setModalState] = useState({ open: false, benefit: null });
  const openModal = (benefit) => setModalState({ open: true, benefit });
  const closeModal = () => setModalState({ open: false, benefit: null });

  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState(null); // Store the item clicked for options
  const groupedBenefits = benefits.reduce((groups, benefit) => {
    const category = benefit.benefitCategory || "Other"; // default category is "Other"
    console.log(category);
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(benefit);
    return groups;
  }, {});

  const fetchBenefitsData = async () => {
    try {
      const token = Cookies.get("wellsora_token");
      if (!token) {
        console.error("No auth token found in cookies");
        return;
      }

      const response = await axios.get(
        "https://benefits-service-dot-wellsora-app.uc.r.appspot.com/api/benefits?limit=100",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Set the benefits data to the state
      setBenefits(response.data.benefits || []);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchBenefitsData();
  }, []);

  const fetchApiData = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant.",
            },
            {
              role: "user",
              content: searchQuery || "Tell me something about health",
            },
          ],
        }),
      });

      const data = await response.json();
      const result = data.choices[0].message.content; // Get the response text from the API
      setApiResult(result); // Update state with API result
    } catch (error) {
      console.error("Error fetching API data:", error);
      setApiResult("Failed to fetch data from API.");
    }
  };

  // const openModal = (item) => {
  //   setModalItem(item);
  //   setShowModal(true);
  // };

  // // Close modal
  // const closeModal = () => {
  //   setShowModal(false);
  //   setModalItem(null);
  // };

  const openChooseInsuranceModal = () => {
    setModalOpen(false); // Close the first modal
    setInsuranceChosen(true); // Open the second modal
  };

  const closeChooseInsuranceModal = () => {
    setInsuranceChosen(false); // Close the second modal
  };

  const handleSelectInsurance = (insurance) => {
    setSelectedInsurance(insurance);
    setInsuranceChosen(false); // Close Choose Insurance modal
  };
  return (
    <div className="dash-container">
      <div className="left-container">
        <div className="dash-logo">
          {/* <img className='logo' src={logoimage} alt="" /> */}
          <span className="logo">Wellsora</span>
        </div>
        <div className="buttons-container">
          <div className="nav-left-buttons-container">
            <ul>
              <Link to="/" className="nav-link">
                <li className={`nav-button ${isActive("Dashboard")}`}>
                  <FaRegCalendarAlt size={20} style={{ marginRight: "10px" }} />
                  Dashboard
                </li>
              </Link>
              <Link to="/sorahealth" className="nav-link">
                <li className={`nav-button ${isActive("Sora Health")}`}>
                  <BsHeartPulseFill size={20} style={{ marginRight: "10px" }} />
                  Sora Health
                </li>
              </Link>
              <Link to="/connectingrecords" className="nav-link">
                <li className={`nav-button ${isActive("Connecting Records")}`}>
                  <IoIosStats size={20} style={{ marginRight: "10px" }} />
                  Connecting records
                </li>
              </Link>
              <Link to="/benefits" className="nav-link">
                <li className={`nav-button ${isActive("Benefits")}`}>
                  <FaHandHoldingHeart
                    size={20}
                    style={{ marginRight: "10px" }}
                  />
                  Benefits
                </li>
              </Link>
              <Link to="/findcaregiver" className="nav-link">
                <li className={`nav-button ${isActive("Find a Caregiver")}`}>
                  <FaSearch size={20} style={{ marginRight: "10px" }} />
                  Find a caregiver
                </li>
              </Link>
            </ul>
          </div>
          <div className="nav-bottom-buttons-container">
            <ul style={{ padding: "20px" }}>
              <li
                onClick={() => setActiveScreen("Setting")}
                className={`nav-button ${isActive("Setting")}`}
              >
                <FaCog size={20} style={{ marginRight: "10px" }} />
                Setting
              </li>
              <li
                onClick={() => setActiveScreen("Privacy Policy")}
                className={`nav-button ${isActive("Privacy Policy")}`}
              >
                <FaLock size={20} style={{ marginRight: "10px" }} />
                Privacy Policy
              </li>
              <li className="nav-button">
                <TbLogout2 size={20} style={{ marginRight: "10px" }} />
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="right-container">
      <div className="right-header">
                    <div className="header-left-container">
                        <span className="name">Benefits</span>
                        
                    </div>
                    <div className="header-right-container">
                        <div className="header-bar">
                            {/* Left Button */}
                            <button  className="create-plan-btn">Connect insurance</button>

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0px 98px 1%",
            width: "99%",
            paddingBottom: "0%",
            marginTop:"25px"
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              padding: "13px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginRight: "10px",
              backgroundColor: "#ffffffff",
            }}
          >
            <FiSearch style={{ marginRight: "10px", color: "#888" }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
              placeholder="e.g. is physical therapy covered?"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "14px",
                backgroundColor: "#fffffff",
                color: "#9E9E9E",
                fontStyle: "italic",
              }}
            />
          </div>

          <button
            className="search"
            onClick={fetchApiData} // Call the API when the button is clicked
          >
            Search
          </button>
        </div>

        <div className="main-undersearch">
          <div className="span-div">
            <span className="undersearch-text">
              {apiResult ||
                "Instantly access your plan details with our AI-powered search. Get quick, accurate answers about your coverage, and benefits—no more navigating complex insurance documents"}
            </span>
          </div>
        </div>

        <div className="insurance-container">
          
<div className="overlflow-control">
  {Object.keys(groupedBenefits).map((category) => (
    <details key={category} className="category-details">
      <summary className="category-summary">
        <span style={{ width: "100%", display: "flex", gap: "20px" }}>
          {/* Render icon and category name */}
          {categoryIcons[category] && (
            <span style={{color: "rgb(27, 119, 155)"}}>{categoryIcons[category]}</span>
          )}
          {category}{" "}
          <span className="catnum">
            {groupedBenefits[category].length} benefits
          </span>

          {/* Dropdown icon */}
          <span className="dropdown-icon" style={{ marginLeft: 'auto' , color: "rgb(27, 119, 155)"}}>
            {/* This could be a state-based toggle to change icon */}
            <FaChevronDown size={20} />
          </span>
        </span>
      </summary>
      <div className="benefit-items">
        {groupedBenefits[category].map((benefit) => (
          <div
            key={benefit._id}
            className="benefit-item"
            onClick={() => openModal(benefit)}
          >
            <CiSearch size={20} color="#007b9e" />
            <div className="benefit-text">
              <span className="benefit-name">
                {benefit.benefitName}
              </span>
            </div>
          </div>
        ))}
      </div>
    </details>
  ))}
</div>
        </div>

        {/* Modal for Benefit Details */}

        {/* Connect Insurance Modal */}
        {isModalOpen && (
          <div className="ins-modal-overlay">
            <div className="ins-modal-content">
              <h2 className="ins-modal-title">Connect Insurance</h2>
              <p className="ins-modal-description">
                Access all your insurance in one place
              </p>
              <div className="ins-modal-actions">
                <button
                  className="ins-btn-primary"
                  onClick={openChooseInsuranceModal}
                >
                  Choose Insurance
                </button>
                <button className="ins-btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {isInsuranceChosen && (
          <div className="ins-modal-overlay">
            <div className="ins-modal-content">
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

              <h2 className="ins-modal-title">Choose Your Insurance</h2>
              <p className="ins-modal-description">
                Choose your insurance from the list below.
              </p>
              <div className="ins-list-container">
                {["HealthGuard", "MediSafe", "SecureCare", "FamilyShield"].map(
                  (insurance) => (
                    <div
                      key={insurance}
                      className="ins-list-item"
                      onClick={() => handleSelectInsurance(insurance)}
                    >
                      {insurance}
                    </div>
                  )
                )}
              </div>
              <div className="ins-modal-actions">
                <button
                  className="ins-btn-secondary"
                  onClick={closeChooseInsuranceModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {modalState.open && modalState.benefit && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h4>{modalState.benefit.benefitName}</h4>
              <p>
                <strong>Benefit Category:</strong>{" "}
                {modalState.benefit.benefitCategory}
              </p>
              <p>
                <strong>Benefit Information:</strong>{" "}
                {modalState.benefit.benefitInformation}
              </p>
              <p>
                <strong>Benefit Cost:</strong> {modalState.benefit.benefitCost}
              </p>
              <p>
                <strong>Essential Info:</strong>{" "}
                {modalState.benefit.essentialInfo}
              </p>
              <p>
                <strong>Provider:</strong> {modalState.benefit.benefitProvider}
              </p>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}

        {/* <div className="main-ccontainer-for-benefits">
      <span>Please Connect your ensurance to View the benefits</span>
    </div> */}
      </div>
    </div>
  );
};

export default Benefits;
