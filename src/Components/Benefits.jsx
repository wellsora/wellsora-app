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
import { MdHealthAndSafety } from "react-icons/md";
import img from "../assets/image.png"
import { FiDollarSign } from "react-icons/fi";
import { CiClock2 } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { GrCircleQuestion } from "react-icons/gr";
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


  const benefitData = {
    _id: {
      $oid: "6799139310683e6c20c5f73d"
    },
    benefitCategory: "Preventive & Screening Services",
    benefitCost: {
      bold: "$0 - You pay nothing",
      description: [
        {
          value: `When part of your yearly "Wellness" visit with a provider who accepts Medicare assignment Note: If received as part of other medical treatment, Part B deductible and coinsurance apply`
        }
      ]
    },
    benefitEligibility: [
      {
        heading: "Medical records, including immunization records",
        value: ["Family health history"]
      },
      {
        value: "Medical records, including immunization records"
      }
    ],
    benefitFrequency: [
      {
        heading: "Must be within first 12 months of having Medicare Part B",
        value: [
          "Contact your provider or attorney",
          "Visit eldercare.acl.gov"
        ]
      },
      {
        value: "Contact your state health department"
      }
    ],
    benefitName: "Advance care planning",
    benefitProvider: "Original Medicare (Parts A and B)"
  };

const Benefits = () => {
  const [isModalOpen, setModalOpen] = useState(false); // Connect Insurance Modal
  const [isInsuranceChosen, setInsuranceChosen] = useState(false); // Choose Insurance Modal
  const [selectedInsurance, setSelectedInsurance] = useState(null); // Store selected insurance
  const [benefits, setBenefits] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [apiResult, setApiResult] = useState(""); // State to store the API
  const [activeScreen, setActiveScreen] = useState("Benefits");
  const [isConnectInsuranceModalOpen, setConnectInsuranceModalOpen] = useState(false); // Connect Insurance Modal
  const [isChooseInsuranceModalOpen, setChooseInsuranceModalOpen] = useState(false); // Choose Insurance Modal
  const [isConfirmInsuranceModalOpen, setConfirmInsuranceModalOpen] = useState(false); // Second Modal
  
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
  const openModal = (benefit) => setModalState({ open: true, benefit: benefit });
  const closeModal = () => setModalState({ open: false, benefit: null });

  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState(null); // Store the item clicked for options
  const groupedBenefits = benefits.reduce((groups, benefit) => {
    const category = benefit.benefitCategory || "Other"; // default category is "Other"
    
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
        process.env.REACT_APP_BENEFITS_URL,
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
      console.log(process.env.REACT_APP_BENEFITS_URL)
      const response = await fetch(process.env.REACT_APP_OPENAPI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAPI_KEY}`,
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
                Settings
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
                        <span style={{ color: "#909096" }}>
                        Explore your benefits: cost, coverage & savings
            </span>
                        
                    </div>
                    <div className="header-right-container">
                        <div className="header-bar">
                            {/* Left Button */}
                            <button onClick={() => setConnectInsuranceModalOpen(true)}  className="create-plan-btn">Connect insurance</button>

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
      className="search-container-ser"
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              padding: "6px 12px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#ffffffff",
            }}
          >
          
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
                color: "#C0C4CB",
                fontstyle: "normal",
              }}
            />
          <button
            className="search"
            onClick={fetchApiData} // Call the API when the button is clicked
          >
            Search
          </button>
          </div>

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
  <div style={{ display: 'flex', justifyContent: 'space-between',width:"100%" }}>
    <div style={{ width: '100%' }}>
      {/* Left Column */}
      {Object.keys(groupedBenefits).slice(0, 14).map((category) => (
        <details key={category} className="category-details">
          <summary className="category-summary">
            <div className="left-category"></div>
            <span style={{ width: "100%", display: "flex", gap: "20px" }}>
              {/* Render icon and category name */}
              {categoryIcons[category] && (
                <span style={{color: "rgb(27, 119, 155)"}}>{categoryIcons[category]}</span>
              )}
             
              <span className="categoryname"> {category}{" "}</span>
              <span className="catnum">
                {groupedBenefits[category].length} benefits
              </span>

              {/* Dropdown icon */}
              <span className="dropdown-icon" style={{ marginLeft: 'auto' , color: "rgb(27, 119, 155)"}}>
                <FaChevronDown size={20} />
              </span>
            </span>
          </summary>
          <div className="benefit-items">
            {groupedBenefits[category].map((benefit) => (
              <div key={benefit._id} className="benefit-item">
                <div className="benefits-text">
                  <span className="benefit-name">
                    {benefit.benefitName}
                  </span>
                  <span className="view-button" onClick={() => openModal(benefit)}>View Details</span>
                </div>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>

    {/* <div style={{ width: '48.5%' }}>
      {/* Right Column */}
      {Object.keys(groupedBenefits).slice(7, 7).map((category) => (
        <details key={category} className="category-details">
          <summary className="category-summary">
            <span style={{ width: "100%", display: "flex", gap: "20px" }}>
              {/* Render icon and category name */}
              {categoryIcons[category] && (
                <span className="categoryname" style={{color: "rgb(27, 119, 155)",width:"17em"}}>{categoryIcons[category]}</span>
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
              <div key={benefit._id} className="benefit-item">
                <div className="benefits-text">
                  <span className="benefit-name">
                    {benefit.benefitName}
                  </span>
                  <span className="view-button" onClick={() => openModal(benefit)}>View Details</span>
                </div>
              </div>
            ))}
          </div>
        </details>
      ))}
    {/* </div> */} 
  </div>
</div>

        </div>

        {/* Modal for Benefit Details */}

        {/* Connect Insurance Modal */}
  {isConnectInsuranceModalOpen && (
  <div className="ins-modal-overlay">
    <div className="ins-modal-content">
      <h2 className="ins-modal-title">Connect Insurance</h2>
      <p className="ins-modal-description">
        You will choose your insurance from the list of available insurance providers
      </p>
      <div className="ins-modal-actions">
        <button
          className="ins-btn-primary"
          onClick={() => {
            setConnectInsuranceModalOpen(false); // Close Connect Insurance modal
            setChooseInsuranceModalOpen(true); // Open Choose Insurance modal
          }}
        >
          Proceed
        </button>
        <button className="ins-btn-secondary" onClick={() => setConnectInsuranceModalOpen(false)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

{isChooseInsuranceModalOpen && (
  <div className="ins-modal-overlay">
    <div className="ins-modal-content">
      <h2 className="ins-modal-title">Choose Your Insurance</h2>
      <p className="ins-modal-description">
        Choose your insurance from the list below.
      </p>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search Insurance"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        className="search-input-in"
      />

      {/* Filtered insurance options */}
      <div className="ins-list-container">
        {["Aetna Medicare","Medicare", "Allwell","AmeriHealth","Capital BlueCross","Cigna HealthSpring","Cigna-HealthSpring", "True Choice","Clear Spring"," Health Value", "Rx",
"Clover Health"]
          .filter((insurance) => insurance.toLowerCase().includes(searchQuery.toLowerCase())) // Filter insurances
          .map((insurance) => (
            <div
              key={insurance}
              className="ins-list-item"
              onClick={() => {
                setSelectedInsurance(insurance); // Set selected insurance
                setChooseInsuranceModalOpen(false); // Close this modal
                setConfirmInsuranceModalOpen(true); // Open the confirmation modal
              }}
            >
              {insurance}
            </div>
          ))}

        {/* If no results found */}
        {searchQuery && !["Aetna Medicare","Medicare", "Allwell","AmeriHealth","Capital BlueCross","Cigna HealthSpring","Cigna-HealthSpring", "True Choice","Clear Spring"," Health Value", "Rx",
"Clover Health"]
          .filter((insurance) => insurance.toLowerCase().includes(searchQuery.toLowerCase()))
          .length && (
            <div className="no-results">No insurance found</div>
        )}
      </div>

      <div className="ins-modal-actions">
        <button className="ins-btn-secondary" onClick={() => setChooseInsuranceModalOpen(false)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
{isConfirmInsuranceModalOpen && (
  <div className="ins-modal-overlay">
    <div className="ins-modal-content">
      <h2 className="ins-modal-title">You Chose:</h2>
      <p className="ins-modal-description">
        You have selected <strong>{selectedInsurance}</strong> insurance.
      </p>

      {/* Proceed button */}
      <div className="ins-modal-actions">
        <button
          className="ins-btn-primary"
          onClick={() => {
            setConfirmInsuranceModalOpen(false); // Close the second modal
            // Proceed with the next step here (e.g., save selection or trigger next action)
          }}
        >
          Proceed
        </button>
        <button className="ins-btn-secondary" onClick={() => setConfirmInsuranceModalOpen(false)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


{modalState.open && modalState.benefit && (
  <div className="modal-overlay">
    <div className="modal-contentben">
      <div className="heading-container">
        <span className="modelbentitle">{modalState.benefit.benefitName}</span>
        <button 
          style={{border: "none", background: "none", position: "relative", top: "-1em", right: "-1em"}} 
          onClick={closeModal}
        >
          <IoClose size={40} />
        </button>
      </div>
      
      <span className="modelbencategory">
        {modalState.benefit.benefitCategory}
      </span>

      {/* Cost Section */}
      <div style={{ paddingBottom: "5%" }} className="modelbencostbox">
        <div className="titlecost">
          <span className="costspan">
            <svg style={{ color: "rgb(27, 119, 155)" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            Cost
          </span>
        </div>
        {modalState.benefit.benefitCost.bold && <span className="modelbencost">
          {modalState.benefit.benefitCost.bold}
        </span>}
        {modalState.benefit.benefitCost.description.map((item, index) => (
          <div key={index}>
          {item.heading ? (
            <div>
              <div className="frequency-heading">{item.heading}</div>
              <ul style={{paddingLeft:"10%"}}>
                {Array.isArray(item.value) ? (
                  item.value.map((valueItem, i) => (
                    <li key={i} className="costdes rp">
                      {valueItem}
                    </li>
                  ))
                ) : (
                  <li style={{ padding:"0%" }} className="costdes rp">{item.value}</li>
                )}
              </ul>
            </div>
          ) : (
            <div style={{ paddingLeft:"8%"}} className="frequency-heading">{item.value}</div>
          )}
        </div>
        ))}
      </div>

      {/* Eligibility Section */}
      <div style={{ paddingBottom: "5%" }} className="modelbencostbox">
        <div className="titlecost">
          <span className="costspan">
            <MdHealthAndSafety color="rgb(27, 119, 155)" />
            Eligibility requirements
          </span>
        </div>
        {modalState.benefit.benefitEligibility.map((item, index) => (
          <div key={index}>
            {item.heading ? (
              <div style={{paddingLeft:"8%",width:"26em" }}>

                <div style={{gap:"6px",display:"flex"}} className="eligibility-heading"><i style={{ color: "#34B570" }} className="fas fa-check"></i>{item.heading}</div>
                <ul>
                  {Array.isArray(item.value) ? (
                    item.value.map((valueItem, i) => (
                      <li key={i} className="costdes rp">
                         {valueItem}
                      </li>
                    ))
                  ) : (
                    <li className="costdes rp">
                      <i style={{ color: "#34B570" }} className="fas fa-check"></i> {item.value}
                    </li>
                  )}
                </ul>
              </div>
            ) : (
              <div style={{paddingLeft:"8%", width:"26em",gap:"6px",display:"flex"}} className="eligibility-heading">
                <i style={{ color: "#34B570" }} className="fas fa-check"></i>
                {item.value}</div>
            )}
          </div>
        ))}
      </div>

      {/* Frequency Section */}
      <div style={{ paddingBottom: "5%" }} className="modelbencostbox">
        <div className="titlecost">
          <span className="costspan">
            <CiClock2 color="rgb(27, 119, 155)" />
            Frequency
          </span>
        </div>
        {modalState.benefit.benefitFrequency.map((item, index) => (
          <div key={index}>
            {item.heading ? (
              <div>
                <div className="frequency-heading">{item.heading}</div>
                <ul style={{paddingLeft:"10%"}}>
                  {Array.isArray(item.value) ? (
                    item.value.map((valueItem, i) => (
                      <li key={i} className="costdes rp">
                        {valueItem}
                      </li>
                    ))
                  ) : (
                    <li style={{ padding:"0%" }} className="costdes rp">{item.value}</li>
                  )}
                </ul>
              </div>
            ) : (
              <div style={{ paddingLeft:"8%"}} className="frequency-heading">{item.value}</div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <div className="modelbencostbox2">
        <div className="titlecost2">
          <span className="costdes2">
            Question about coverage? Contact Member Services
          </span>
        </div>
      </div>
    </div>
  </div>
)}


        
      </div>
    </div>
  );
};

export default Benefits;
