import React, { useState } from 'react';
import { FaBell, FaHeartbeat } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { FaClipboardList, FaPills, FaAllergies, FaUserFriends, FaHeart } from 'react-icons/fa';
import logoimage from "../assets/logoimage.svg";
import { FaRegCalendarAlt, FaHandHoldingHeart, FaSearch, FaCog, FaLock } from 'react-icons/fa';
import { BsHeartPulseFill } from 'react-icons/bs';
import { IoIosStats } from 'react-icons/io';
import { Link } from 'react-router-dom'; 
import { TbLogout2 } from "react-icons/tb";
import Dashboard_left from "./dash-right";
import Sorahealth from "./SoraHealth";
import Privacy from './Privacy';
import Benefits from './Benefits';
import { Caregiver } from './Caregiver';
import Settings from "./Settings"

import "../App.css";

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
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [showStep1Modal, setShowStep1Modal] = useState(false); // Step 1 Modal
  const [showStep2Modal, setShowStep2Modal] = useState(false); // Step 2 Modal
  const [showStep3Modal, setShowStep3Modal] = useState(false); // Step 3 Modal
  const [showModal, setShowModal] = useState(false); // Modal state to show content
  const [modalItem, setModalItem] = useState(null); // Store the item clicked for options
  const [selectedProvider, setSelectedProvider] = useState(null); // Track selected provider
  const [activeScreen, setActiveScreen] = useState("Connecting Records");
  const isActive = (screen) => activeScreen === screen ? 'active-button' : '';

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

  // Handle tab selection
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // Open modal for specific item
  const openModal = (item) => {
    setModalItem(item);  // Set the item that was clicked (e.g., a medication or visit)
    setShowModal(true);   // Show the modal
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false); // Close the modal
    setModalItem(null);   // Reset the modal item
  };

  // Insurance Modal Logic
  const openInsuranceModal = () => setShowInsuranceModal(true);
  const closeInsuranceModal = () => setShowInsuranceModal(false);

  const handleConfirmInsurance = () => {
    setShowInsuranceModal(false);
    setShowStep1Modal(true); // Step 1 Modal appears
  };

  const handleConfirmStep1 = () => {
    setShowStep1Modal(false);
    setShowStep2Modal(true); // Step 2 Modal appears
  };

  const handleConfirmStep2 = () => {
    setShowStep2Modal(false);
    setShowStep3Modal(true); // Step 3 Modal appears
  };

  const handleConfirmStep3 = () => {
    setShowStep3Modal(false);
    alert('All steps completed!');
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
                  {/* <button onClick={() => openModal(allergy)}>More Info</button> */}
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
                          Connecting Records
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
                          Find a Caregiver
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
        <div className='inner-c'>
          <div className="right-header">
            <div style={{ width: "40%" }} className="header-left-container">
              <span className="Title-name">Connecting board</span>
            </div>
            <div className="header-right-container">
              <div className="header-bar">
                <button className="create-plan-btn" onClick={openInsuranceModal}>Connect your records</button>
                <div className="notification-icon">
                  <FaBell />
                </div>
              </div>
            </div>
          </div>

          {/* Navbar with Tab Selection */}
          <div className="navbar2">
            <a href="#past-visits" onClick={() => handleTabClick('past-visits')} className={selectedTab === 'past-visits' ? 'selected' : ''}>
              <FaClipboardList /> Past Visits
            </a>
            <a href="#medications" onClick={() => handleTabClick('medications')} className={selectedTab === 'medications' ? 'selected' : ''}>
              <FaPills /> Medications
            </a>
            <a href="#allergies" onClick={() => handleTabClick('allergies')} className={selectedTab === 'allergies' ? 'selected' : ''}>
              <FaAllergies /> Allergies
            </a>
            <a href="#Care Team" onClick={() => handleTabClick('CareTeam')} className={selectedTab === 'CareTeam' ? 'selected' : ''}>
  <FaUserFriends size={20} style={{ marginRight: '10px' }} /> {/* Updated icon */}
  Care Team
</a>
<a href="Conditions" onClick={() => handleTabClick('Conditions')} className={selectedTab === 'Conditions' ? 'selected' : ''}>
  <FaHeart size={20} style={{ marginRight: '10px' }} /> {/* Updated icon */}
  Conditions
</a>
          </div>

          {/* Tab Content */}
          <div className="tab-content">{renderTabContent()}</div>
        </div>
      </div>

      {/* Insurance Modal */}
      {showInsuranceModal && (
        <div className="ins-modal-overlay">
          <div className="ins-modal-content">
            <div className="modal-header">
              <FaHeartbeat size={40} style={{ color: "#EA7551" }} />
            </div>
            <h2 className="ins-modal-title">Access all your records</h2>
            <p className="ins-modal-description">Access your medical information in one place</p>
            <div className="ins-modal-actions">
              <button onClick={handleConfirmInsurance}>Connect Records</button>
              <button onClick={closeInsuranceModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Step 1 Modal */}
      {showStep1Modal && (
  <div className="ins-modal-overlay">
    <div className="ins-modal-content">
    <div className="modal-header">
              <FaHeartbeat size={40} style={{ color: "#EA7551" }} />
            </div>
      <h2>Select your health provider</h2>
      <p>Choose from the list of available health providers:</p>
      <div className="health-provider-list">
        {/* Add a list of health providers */}
        {['HealthGuard', 'MediSafe', 'SecureCare', 'FamilyShield'].map((provider, index) => (
          <div
            key={index}
            className={`health-provider-item ${selectedProvider === provider ? 'selected' : ''}`}
            onClick={() => setSelectedProvider(provider)} // Set selected provider
          >
            {provider}
          </div>
        ))}
      </div>
      <button 
        onClick={handleConfirmStep1} 
        disabled={!selectedProvider} // Disable continue button if no provider is selected
      >
        Continue
      </button>
    </div>
  </div>
)}


      {/* Step 2 Modal */}
      {showStep2Modal && (
        <div className="ins-modal-overlay">
          <div className="ins-modal-content">
          <div className="modal-header">
              <FaHeartbeat size={40} style={{ color: "#EA7551" }} />
            </div>
            <h2>Connect to your Health portal</h2>
            <button onClick={handleConfirmStep2}>Proceed</button>
          </div>
        </div>
      )}
      {showModal && (
  <div className="ins-modal-overlay">
    <div className="ins-modal-content2">
      <div className="modal-header">
        <FaHeartbeat size={40} style={{ color: "#EA7551" }} />
      </div>
      
      {/* Modal content based on item type */}
      {modalItem && modalItem.title ? (
        // Display content for 'past-visits'
        <div>
          <h3>{modalItem.title}</h3>
          <p><strong>Doctor:</strong> {modalItem.doctor}</p>
          <p><strong>Clinic:</strong> {modalItem.clinic}</p>
          <p><strong>Date:</strong> {modalItem.date}</p>
          <p><strong>Description:</strong> {modalItem.description}</p>
        </div>
      ) : modalItem && modalItem.name ? (
        // Display content for 'medications'
        <div>
          <h3>{modalItem.name}</h3>
          <p><strong>Dosage:</strong> {modalItem.dosage}</p>
          <p><strong>Date:</strong> {modalItem.date}</p>
          <p><strong>Directions:</strong> {modalItem.directions}</p>
        </div>
      ) : null}

      {/* Close Modal Button */}
      <button onClick={closeModal}>Close</button>
    </div>
  </div>
)}

{showInsuranceModal && (
  <div className="ins-modal-overlay">
    <div className="ins-modal-content">
      <h2>Access all your records</h2>
      <button onClick={handleConfirmInsurance}>Connect Records</button>
      <button onClick={closeInsuranceModal}>Cancel</button>
    </div>
  </div>
)}


      {/* Step 3 Modal */}
      {/* {showStep3Modal && (
        <div className="ins-modal-overlay">
          <div className="ins-modal-content">
            <h2>Step 3: Final Review</h2>
            <p>Review all the details and finalize the setup.</p>
            <button onClick={handleConfirmStep3}>Finish</button>
            <button onClick={() => setShowStep3Modal(false)}>Cancel</button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ConnectingBoard;
