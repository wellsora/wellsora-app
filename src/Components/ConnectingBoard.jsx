import React, { useState, useEffect } from 'react';
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
import { redirectToLogin } from './FhirEpic/oauthHelpers';
import { useSearchParams } from "react-router-dom";
import { exchangeCodeForToken, setTokens } from "./FhirEpic/oauthHelpers";
import { apiClient } from "./FhirEpic/apiClient";


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
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  // fhir resources
  const [encounter, setEncounter] = useState(null); // Track past visits
  const [medications, setMedications] = useState(null); // Track medications
  const [allergies, setAllergies] = useState(null); // Track allergies
  const [careTeam, setCareTeam] = useState(null); // Track care team
  const [conditions, setConditions] = useState(null); // Track conditions

  // Fetch data functions
  const fetchEncounterData = async () => {
    try {
      const patientId = sessionStorage.getItem("patientId");
      const response = await apiClient.get(`/Encounter?patient=${patientId}`);
      setEncounter(response.data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const fetchMedicationsData = async () => {
    try {
      const patientId = sessionStorage.getItem("patientId");
      const response = await apiClient.get(`/MedicationRequest?patient=${patientId}&status=active`);
      setMedications(response.data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const fetchAllergiesData = async () => {
    try {
      const patientId = sessionStorage.getItem("patientId");
      const response = await apiClient.get(`/AllergyIntolerance?patient=${patientId}`);
      setAllergies(response.data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const fetchCareTeamData = async () => {
    try {
      const patientId = sessionStorage.getItem("patientId");
      const response = await apiClient.get(`CareTeam?patient=${patientId}`);
      setCareTeam(response.data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const fetchConditionsData = async () => {
    try {
      const patientId = sessionStorage.getItem("patientId");
      const response = await apiClient.get(`/Condition?patient=${patientId}&category=problem-list-item`);
      setConditions(response.data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  useEffect(() => {
    const handleOAuthCallback = async () => {
      console.log(code);
      if (code) {
        try {
          const tokens = await exchangeCodeForToken(code);
          setTokens(tokens); // Save tokens
          window.location.href = "/connectingrecords"; // Redirect to connectingrecords
        } catch (error) {
          console.error("Error during token exchange:", error);
        }
      }
    };

    handleOAuthCallback();

    fetchEncounterData();

    // console.log("Encounter data: ", encounter);
    
  }, [code]);
 

// Handle tab selection
const handleTabClick = (tab) => {
  setSelectedTab(tab);

  switch (tab) {
    case 'past-visits':
      return fetchEncounterData();
    case 'medications':
      return fetchMedicationsData();
    case 'allergies':
      return fetchAllergiesData();
    default:
      return;
    }
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
    redirectToLogin();
  };

  const handleConfirmStep3 = () => {
    setShowStep3Modal(false);
    alert('All steps completed!');
  };

  // console.log(dummyData);

  // Render tab content
  const renderTabContent = () => {
    switch (selectedTab) {
      case 'past-visits':
        return (
          <div className='main-d'>
            <h3>Past Visits</h3>
            {encounter?.entry?.map((visit, index) => (
              visit.resource.resourceType === 'Encounter' && (
          <div className='item-c' key={index}>
            <div className="r">
              <h4>{visit.resource.type?.[0].text || "NA"}</h4>
              <p>{visit.resource.participant?.[0]?.individual?.type|| "NA"} - {visit.resource.participant?.[0]?.individual?.display || "NA"}</p>
              <p>{visit.resource.location?.[0]?.location?.display || "NA"}</p>
            </div>
            <div className="l">
              <p>{visit.resource.period?.start.split('T')[0] || "NA"}</p>
              <button onClick={() => openModal(visit)}>Visit Results</button>
            </div>
          </div>
              )
            ))}
          </div>
        );
      case 'medications':
        return (
          <div className='main-d'>
            <h3>Medications</h3>
            {medications?.entry?.map((med, index) => (
              med.resource.resourceType === 'MedicationRequest' && (
              <div className='item-c' key={index}>
                <div className="r">
                  <h4>{med.resource.medicationReference?.display || "NA"}</h4>
                  <p>{med.resource.medicationReference?.display || "NA"}</p>
                </div>
                <div className="l">
                  <p>{med.resource.authoredOn || "NA"}</p>
                  <button onClick={() => openModal(med)}>View Details</button>
                </div>
              </div>
              )
            ))}
          </div>
        );
      case 'allergies':
        return (
          <div className='main-d'>
            <h3>Allergies</h3>
            {allergies?.entry?.map((allergy, index) => (
              allergy.resource.resourceType === 'AllergyIntolerance' && (
              <div style={{padding: '2%'}} className='item-c' key={index}>
                <div className="r">
                  <p>{allergy.resource.code?.coding?.[0].display || "NA"} - {allergy.resource.code?.text || "NA"}</p>
                </div>
              </div>
              )
            ))}
          </div>
        );
      case 'care-team':
        return (
          // render we couldn't find you care Team infomation in ui 
          <div className='main-d'>
            <h3>Care Team</h3>
            <div style={{padding: '2%'}} className='item-c'>
                <div className="r">
                  <p>We couldn't find any infomation in your records</p>
                </div>
            </div>
          </div>
        )
      case 'conditions':
        return (
          // render we couldn't find you conditions infomation in ui
          <div className='main-d'>
            <h3>Conditions</h3>
            <div style={{padding: '2%'}} className='item-c'>
                <div className="r">
                  <p>We couldn't find any infomation in your records</p>
                </div>
            </div>
          </div>
        )
      default:
        return null;
    }
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
              <span className="Title-name">Connecting Records</span>
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
            <a href="#care-team" onClick={() => handleTabClick('care-team')} className={selectedTab === 'care-team' ? 'selected' : ''}>
  <FaUserFriends size={20} style={{ marginRight: '10px' }} /> {/* Updated icon */}
  Care Team
</a>
<a href="#conditions" onClick={() => handleTabClick('conditions')} className={selectedTab === 'conditions' ? 'selected' : ''}>
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
      
      {/* Modal content based on item type  */}
      {modalItem && modalItem.resource && modalItem.resource.resourceType && (
        <div>
          {(() => {
            switch (modalItem.resource.resourceType) {
              case 'Encounter':
                return (
                  <div>
                    <h3>{modalItem.resource.type?.[0].text || "NA"}</h3>
                    <p><strong>Doctor:</strong> {modalItem.resource.participant?.[0]?.individual?.display || "NA"}</p>
                    <p><strong>Clinic:</strong> {modalItem.resource.location?.[0]?.location?.display || "NA"}</p>
                    <p><strong>Date:</strong> {modalItem.resource.period?.start.split('T')[0] || "NA"}</p>
                    {/* <p><strong>Description:</strong> {modalItem.resource.text?.div || "NA"}</p> */}
                  </div>
                );
              case 'MedicationRequest':
                return (
                  <div>
                    <h3>{modalItem.resource.medicationReference?.display || "NA"}</h3>
                    {/* <p><strong>Dosage:</strong> {modalItem.resource.dosageInstruction?.[0]?.text || "NA"}</p> */}
                    <p><strong>Date:</strong> {modalItem.resource.authoredOn || "NA"}</p>
                    <p><strong>Directions:</strong> {modalItem.resource.dosageInstruction?.[0]?.text || "NA"}</p>
                  </div>
                );
              case 'AllergyIntolerance':
                return (
                  <div>
                    <h3>{modalItem.resource.code?.coding?.[0].display || "NA"}</h3>
                    <p><strong>Reaction:</strong> {modalItem.resource.reaction?.[0]?.manifestation?.[0]?.text || "NA"}</p>
                  </div>
                );
              default:
                return null;
            }
          })()}
        </div>
      )}
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
