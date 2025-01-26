import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { FaClipboardList, FaPills, FaAllergies, FaUserFriends, FaHeart } from 'react-icons/fa';
import logoimage from "../assets/logoimage.svg";
import { FaRegCalendarAlt, FaHandHoldingHeart, FaSearch, FaCog, FaLock } from 'react-icons/fa'; // Icons from react-icons
import { BsHeartPulseFill } from 'react-icons/bs'; // Another icon from react-icons
import { IoIosStats } from 'react-icons/io'; // Stats icon from react-icons
import { TbLogout2 } from "react-icons/tb";
import Dashboard_left from "./dash-right";
import Sorahealth from "./SoraHealth";
import Privacy from './Privacy';
import Benefits from './Benefits';
import { Caregiver } from './Caregiver';
import Settings from "./Settings"

// Dummy data for each section
const dummyData = {
  'past-visits': [
    { title: 'Annual Check up', doctor: 'Dr. Smith', clinic: 'Primary Care Clinic', date: '01/01/2025', visitType: 'Office Visit', description: 'ECG Cardiology Procedures' },
    { title: 'Annual Check up', doctor: 'Dr. Smith', clinic: 'Primary Care Clinic', date: '02/01/2025', visitType: 'Office Visit', description: 'ECG Cardiology Procedures' },
    { title: 'Annual Check up', doctor: 'Dr. Smith', clinic: 'Primary Care Clinic', date: '03/01/2025', visitType: 'Office Visit', description: 'ECG Cardiology Procedures' },
  ],
  medications: [
    { name: 'Aspirin', dosage: '100mg', date: '01/01/2025', directions: 'Take 1 Tablet daily after meals' },
    { name: 'Ibuprofen', dosage: '200mg', date: '02/01/2025', directions: 'Take 1 Tablet daily after meals' },
  ],
  allergies: ['Peanuts', 'Dust', 'Pollen'],
  'care-team': ['Dr. Smith', 'Nurse Jane', 'Dr. John'],
  conditions: ['Hypertension', 'Asthma'],
};

const ConnectingBoard = () => {
  const [selectedTab, setSelectedTab] = useState('past-visits');
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState(null); // Store the item clicked for options
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

  // Handle tab selection
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // Open modal for specific item
  const openModal = (item) => {
    setModalItem(item);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setModalItem(null);
  };

  // Render tab content
  const renderTabContent = () => {
    switch (selectedTab) {
      case 'past-visits':
        return (
          <div className='main-d'>
            <h3>Past Visits</h3>
            {dummyData['past-visits'].map((visit, index) => (
              <div className='item-c' key={index}>
                <div className="r">
                  <h4>{visit.title}</h4>
                  <p>{visit.doctor}</p>
                  <p>{visit.clinic}</p>
                </div>
                <div className="l">
                  <p>{visit.date}</p>
                  <button onClick={() => openModal(visit)}>Visit Results</button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'medications':
        return (
          <div className='main-d'>
            <h3>Medications</h3>
            {dummyData.medications.map((med, index) => (
              <div className='item-c' key={index}>
                <div className="r">
                  <h4>{med.name}</h4>
                  <p>{med.dosage}</p>
                </div>
                <div className="l">
                  <p>{med.date}</p>
                  <button onClick={() => openModal(med)}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'allergies':
        return (
          <div className='main-d'>
            <h3>Allergies</h3>
            {dummyData.allergies.map((allergy, index) => (
              <div className='item-c' key={index}>
                <div className="r">
                  <p>{allergy}</p>
                </div>
                <div className="l">
                  <button onClick={() => openModal(allergy)}>More Info</button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'care-team':
        return (
          <div className='main-d'>
            <h3>Care Team</h3>
            {dummyData['care-team'].map((teamMember, index) => (
              <div className='item-c' key={index}>
                <div className="r">
                  <img src="" alt="" />
                  <p>{teamMember}</p>
                </div>
                <div className="l">
                  <button onClick={() => openModal(teamMember)}>Contact</button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'conditions':
        return (
          <div className='main-d'>
            <h3>Conditions</h3>
            {dummyData.conditions.map((condition, index) => (
              <div className='item-c' key={index}>
                <div className="r">
                  <p>{condition}</p>
                </div>
                <div className="l">
                  <button onClick={() => openModal(condition)}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
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
        
   

    <div className='inner-c'>
      {/* Header Section */}
      <div className="right-header">
        <div style={{ width: "40%" }} className="header-left-container">
          <span className="Title-name">Connecting board</span>
        </div>

        <div className="header-right-container">
          <div className="header-bar">
            <button className="create-plan-btn">Connect your records</button>

            <div className="notification-icon">
              <FaBell />
            </div>

            <div className="profile-container">
              <img
                src="https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197908.png"
                alt="User Profile"
                className="profile-picture"
              />
              <HiDotsVertical style={{ fontSize: 30 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Navbar with Tab Selection */}
      <div className="navbar2">
        <a
          href="#past-visits"
          onClick={() => handleTabClick('past-visits')}
          className={selectedTab === 'past-visits' ? 'selected' : ''}
        >
          <FaClipboardList /> Past Visits
        </a>
        <a
          href="#medications"
          onClick={() => handleTabClick('medications')}
          className={selectedTab === 'medications' ? 'selected' : ''}
        >
          <FaPills /> Medications
        </a>
        <a
          href="#allergies"
          onClick={() => handleTabClick('allergies')}
          className={selectedTab === 'allergies' ? 'selected' : ''}
        >
          <FaAllergies /> Allergies
        </a>
        <a
          href="#care-team"
          onClick={() => handleTabClick('care-team')}
          className={selectedTab === 'care-team' ? 'selected' : ''}
        >
          <FaUserFriends /> Care Team
        </a>
        <a
          href="#conditions"
          onClick={() => handleTabClick('conditions')}
          className={selectedTab === 'conditions' ? 'selected' : ''}
        >
          <FaHeart /> Conditions
        </a>
      </div>

      {/* Tab Content */}
      <div className="tab-content">{renderTabContent()}</div>

      {/* Modal for displaying item details */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Information</h4>
            <p>{modalItem.visitType || modalItem.name || modalItem}</p>
            <p>{modalItem.description || modalItem.directions || ''}</p>
  
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
    </div>
</div>

  );
};

export default ConnectingBoard;
