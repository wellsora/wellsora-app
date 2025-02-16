import React, { useState, useEffect } from "react";
import { FaBell, FaHeartbeat } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import {
  FaClipboardList,
  FaPills,
  FaAllergies,
  FaUserFriends,
  FaHeart,
} from "react-icons/fa";
import logoimage from "../assets/logoimage.svg";
import {
  FaRegCalendarAlt,
  FaHandHoldingHeart,
  FaSearch,
  FaCog,
  FaLock,
} from "react-icons/fa";
import { BsHeartPulseFill } from "react-icons/bs";
import { IoIosStats } from "react-icons/io";
import { Link } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import Dashboard_left from "./dash-right";
import Sorahealth from "./SoraHealth";
import Privacy from "./Privacy";
import Benefits from "./Benefits";
import { Caregiver } from "./Caregiver";
import Settings from "./Settings";
import img from "../assets/image.png";
import "../App.css";
import { redirectToLogin } from "./FhirEpic/oauthHelpers";
import { useSearchParams } from "react-router-dom";
import { exchangeCodeForToken, setTokens } from "./FhirEpic/oauthHelpers";
import { apiClient } from "./FhirEpic/apiClient";

const ConnectingBoard = () => {
  const [selectedTab, setSelectedTab] = useState("past-visits");
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [showStep1Modal, setShowStep1Modal] = useState(false); // Step 1 Modal
  const [showStep2Modal, setShowStep2Modal] = useState(false); // Step 2 Modal
  const [showStep3Modal, setShowStep3Modal] = useState(false); // Step 3 Modal
  const [showModal, setShowModal] = useState(false); // Modal state to show content
  const [modalItem, setModalItem] = useState(null); // Store the item clicked for options
  const [selectedProvider, setSelectedProvider] = useState(null); // Track selected provider
  const [activeScreen, setActiveScreen] = useState("Connecting Records");
  const isActive = (screen) => (activeScreen === screen ? "active-button" : "");

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
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  // fhir resources
  const [encounter, setEncounter] = useState(null); // Track past visits
  const [medications, setMedications] = useState(null); // Track medications
  const [allergies, setAllergies] = useState(null); // Track allergies
  const [careTeam, setCareTeam] = useState(null); // Track care team
  const [conditions, setConditions] = useState(null); // Track conditions
  const [isConnectInsuranceModalOpen, setConnectInsuranceModalOpen] =
    useState(false); // Connect Insurance Modal
  const [isChooseInsuranceModalOpen, setChooseInsuranceModalOpen] =
    useState(false); // Choose Insurance Modal
  const [isConfirmInsuranceModalOpen, setConfirmInsuranceModalOpen] =
    useState(false); // Second Modal
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInsurance, setSelectedInsurance] = useState(null);
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
      const response = await apiClient.get(
        `/MedicationRequest?patient=${patientId}&status=active`
      );
      setMedications(response.data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const fetchAllergiesData = async () => {
    try {
      const patientId = sessionStorage.getItem("patientId");
      const response = await apiClient.get(
        `/AllergyIntolerance?patient=${patientId}`
      );
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
      const response = await apiClient.get(
        `/Condition?patient=${patientId}&category=problem-list-item`
      );
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
      case "past-visits":
        return fetchEncounterData();
      case "medications":
        return fetchMedicationsData();
      case "allergies":
        return fetchAllergiesData();
      default:
        return;
    }
  };

  // Open modal for specific item
  const openModal = (item) => {
    setModalItem(item); // Set the item that was clicked (e.g., a medication or visit)
    setShowModal(true); // Show the modal
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false); // Close the modal
    setModalItem(null); // Reset the modal item
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
    setChooseInsuranceModalOpen(false);
  };

  const checkPatientId = () => {
    const patientId =
      sessionStorage.getItem("patientId") || localStorage.getItem("patientId");
    console.log("Patient ID:", patientId); // Debugging log

    return patientId ? true : false; // Return true if patientId exists, otherwise false
  };
  useEffect(() => {
    // Timeout to simulate a 5-second delay
    const timeoutId = setTimeout(() => {
      // Check for the patientId after 5 seconds
      if (!checkPatientId()) {
        setConnectInsuranceModalOpen(true); // Show modal if the patientId is not present
      }
    }, 100); // Wait for 5000ms (5 seconds)

    // Cleanup function to clear the timeout if the component is unmounted
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array ensures this runs only once on component mount

  // console.log(dummyData);

  // Render tab content
  const renderTabContent = () => {
    switch (selectedTab) {
      case "past-visits":
        return (
          <div className="main-d">
            <h3>Past Visits</h3>
            {encounter?.entry?.map(
              (visit, index) =>
                visit.resource.resourceType === "Encounter" && (
                  <div className="item-c" key={index}>
                    <div className="r">
                      <h4 style={{ fontsize: "24px" }}>
                        {visit.resource.type?.[0].text || "NA"}
                      </h4>
                      <p>
                        {visit.resource.participant?.[0]?.individual?.type ||
                          "NA"}{" "}
                        -{" "}
                        {visit.resource.participant?.[0]?.individual?.display ||
                          "NA"}
                      </p>
                      <p>
                        {visit.resource.location?.[0]?.location?.display ||
                          "NA"}
                      </p>
                    </div>
                    <div className="l">
                      <p>
                        {new Date(
                          visit.resource.period?.start.split("T")[0]
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        }) || "NA"}
                      </p>
                      <button onClick={() => openModal(visit)}>
                        Visit Results
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        );
      case "medications":
        return (
          <div className="main-d">
            <h3>Medications</h3>
            {medications?.entry?.map(
              (med, index) =>
                med.resource.resourceType === "MedicationRequest" && (
                  <div className="item-c" key={index}>
                    <div className="r">
                      <h4>
                        {med.resource.medicationReference?.display || "NA"}
                      </h4>
                      <p>{med.resource.medicationReference?.display || "NA"}</p>
                    </div>
                    <div className="l">
                      <p>
                        {new Date(med.resource.authoredOn).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "2-digit", year: "numeric" }
                        ) || "NA"}
                      </p>
                      <button onClick={() => openModal(med)}>
                        View Details
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        );
      case "allergies":
        return (
          <div className="main-d">
            <h3>Allergies</h3>
            {allergies?.entry?.map(
              (allergy, index) =>
                allergy.resource.resourceType === "AllergyIntolerance" && (
                  <div style={{ padding: "2%" }} className="item-c" key={index}>
                    <div className="r">
                      <p>
                        {allergy.resource.code?.coding?.[0].display || "NA"} -{" "}
                        {allergy.resource.code?.text || "NA"}
                      </p>
                    </div>
                  </div>
                )
            )}
          </div>
        );
      case "care-team":
        return (
          // render we couldn't find you care Team infomation in ui
          <div className="main-d">
            <h3>Care Team</h3>
            <div style={{ padding: "2%" }} className="item-c">
              <div className="r">
                <p>We couldn't find any infomation in your records</p>
              </div>
            </div>
          </div>
        );
      case "conditions":
        return (
          // render we couldn't find you conditions infomation in ui
          <div className="main-d">
            <h3>Conditions</h3>
            <div style={{ padding: "2%" }} className="item-c">
              <div className="r">
                <p>We couldn't find any infomation in your records</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
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
        <div className="inner-c">
          <div className="right-header">
            <div className="header-left-container">
              <span className="name">Medical records</span>
              <span style={{ color: "#909096" }}>
              <span style={{ color: "#909096" }}>
                      All your health records, one secure connection
            </span>
            </span>
            </div>
            <div className="header-right-container">
              <div className="header-bar">
                {/* Left Button */}
                <button
                  onClick={() => setConnectInsuranceModalOpen(true)}
                  className="create-plan-btn"
                >
                  Connect records
                </button>

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
                  />
                  <HiDotsVertical style={50} />
                </div>
              </div>
            </div>
          </div>

          {/* Navbar with Tab Selection */}
          <div className="navbar2">
            <a
              href="#past-visits"
              onClick={() => handleTabClick("past-visits")}
              className={selectedTab === "past-visits" ? "selected" : ""}
            >
              <FaClipboardList /> Past Visits
            </a>
            <a
              href="#medications"
              onClick={() => handleTabClick("medications")}
              className={selectedTab === "medications" ? "selected" : ""}
            >
              <FaPills /> Medications
            </a>
            <a
              href="#allergies"
              onClick={() => handleTabClick("allergies")}
              className={selectedTab === "allergies" ? "selected" : ""}
            >
              <FaAllergies /> Allergies
            </a>
            <a
              href="#care-team"
              onClick={() => handleTabClick("care-team")}
              className={selectedTab === "care-team" ? "selected" : ""}
            >
              <FaUserFriends size={20} style={{ marginRight: "10px" }} />{" "}
              {/* Updated icon */}
              Care Team
            </a>
            <a
              href="#conditions"
              onClick={() => handleTabClick("conditions")}
              className={selectedTab === "conditions" ? "selected" : ""}
            >
              <FaHeart size={20} style={{ marginRight: "10px" }} />{" "}
              {/* Updated icon */}
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
            <p className="ins-modal-description">
              Access your medical information in one place
            </p>
            <div className="ins-modal-actions">
              <button
                style={{ color: "white" }}
                className="modelbutton"
                onClick={handleConfirmInsurance}
              >
                Connect Records
              </button>
              <button className="modelbutton" onClick={closeInsuranceModal}>
                Cancel
              </button>
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
              {["HealthGuard", "MediSafe", "SecureCare", "FamilyShield"].map(
                (provider, index) => (
                  <div
                    key={index}
                    className={`health-provider-item ${
                      selectedProvider === provider ? "selected" : ""
                    }`}
                    onClick={() => setSelectedProvider(provider)} // Set selected provider
                  >
                    {provider}
                  </div>
                )
              )}
            </div>
            <button
              className="model-button"
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
            {modalItem &&
              modalItem.resource &&
              modalItem.resource.resourceType && (
                <div>
                  {(() => {
                    switch (modalItem.resource.resourceType) {
                      case "Encounter":
                        return (
                          <div>
                            <h3>{modalItem.resource.type?.[0].text || "NA"}</h3>
                            <p>
                              <strong>Doctor:</strong>{" "}
                              {modalItem.resource.participant?.[0]?.individual
                                ?.display || "NA"}
                            </p>
                            <p>
                              <strong>Clinic:</strong>{" "}
                              {modalItem.resource.location?.[0]?.location
                                ?.display || "NA"}
                            </p>
                            <p className="mar">
                              <strong>Date:</strong>{" "}
                              {new Date(
                                modalItem.resource.period?.start.split("T")[0]
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                              }) || "NA"}
                            </p>

                            {/* <p><strong>Description:</strong> {modalItem.resource.text?.div || "NA"}</p> */}
                          </div>
                        );
                      case "MedicationRequest":
                        return (
                          <div>
                            <h3>
                              {modalItem.resource.medicationReference
                                ?.display || "NA"}
                            </h3>
                            {/* <p><strong>Dosage:</strong> {modalItem.resource.dosageInstruction?.[0]?.text || "NA"}</p> */}
                            <p>
                              <strong>Date:</strong>{" "}
                              {new Date(
                                modalItem.resource.authoredOn
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                              }) || "NA"}
                            </p>
                            <p className="mar" style={{ marginbottom: "14px" }}>
                              <strong>Directions:</strong>{" "}
                              {modalItem.resource.dosageInstruction?.[0]
                                ?.text || "NA"}
                            </p>
                          </div>
                        );
                      case "AllergyIntolerance":
                        return (
                          <div>
                            <h3>
                              {modalItem.resource.code?.coding?.[0].display ||
                                "NA"}
                            </h3>
                            <p>
                              <strong>Reaction:</strong>{" "}
                              {modalItem.resource.reaction?.[0]
                                ?.manifestation?.[0]?.text || "NA"}
                            </p>
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
      {isConnectInsuranceModalOpen && (
        <div className="ins-modal-overlay">
          <div className="ins-modal-content">
            <h2 className="ins-modal-title">Connect Your Records</h2>
            <p className="ins-modal-description">
            Access all your medical information in one place
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
              <button
                className="ins-btn-secondary"
                onClick={() => setConnectInsuranceModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isChooseInsuranceModalOpen && (
        <div className="ins-modal-overlay">
          <div className="ins-modal-content">
            <h2 className="ins-modal-title">Select your health provider</h2>
            <p className="ins-modal-description">
            Choose your hospital to connect your records
            </p>

            {/* Search bar */}
            <input
              type="text"
              placeholder="Search hospital"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query
              className="search-input-in"
            />

            {/* Filtered insurance options */}
            <div className="ins-list-container">
              {[
                "Penn Medicine",
                "Cleveland Clinic",
                "Johns Hopkins Medicine",
                "Mayo Clinic",
                "Stanford Health Care",
                "NYU Langone Health",
                "Duke Health",
                "Massachusetts General Hospital",
                "UPMC",
                "Northwestern Medicine",
                "Mount Sinai Health System",
                "UC San Diego Health",
                "Jefferson Health",
                "Temple Health",
                "Main Line Health",
                "Children's Hospital of Philadelphia (CHOP)",
                "Tower Health",
                "Yale New Haven Health",
                "Michigan Medicine (University of Michigan)",
                "Barnes-Jewish Hospital/BJC HealthCare",
              ]

                .filter((insurance) =>
                  insurance.toLowerCase().includes(searchQuery.toLowerCase())
                ) // Filter insurances
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
              {searchQuery &&
                ![
                  "Penn Medicine",
                  "Cleveland Clinic",
                  "Johns Hopkins Medicine",
                  "Mayo Clinic",
                  "Stanford Health Care",
                  "NYU Langone Health",
                  "Duke Health",
                  "Massachusetts General Hospital",
                  "UPMC",
                  "Northwestern Medicine",
                  "Mount Sinai Health System",
                  "UC San Diego Health",
                  "Jefferson Health",
                  "Temple Health",
                  "Main Line Health",
                  "Children's Hospital of Philadelphia (CHOP)",
                  "Tower Health",
                  "Yale New Haven Health",
                  "Michigan Medicine (University of Michigan)",
                  "Barnes-Jewish Hospital/BJC HealthCare",
                ].filter((insurance) =>
                  insurance.toLowerCase().includes(searchQuery.toLowerCase())
                ).length && (
                  <div className="no-results">No Hospital found</div>
                )}
            </div>

            <div className="ins-modal-actions">
              <button
                className="ins-btn-secondary"
                onClick={() => {
                  setConfirmInsuranceModalOpen(false); // Close the second modal
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isConfirmInsuranceModalOpen && (
        <div className="ins-modal-overlay">
          <div className="ins-modal-content">
              <h2 style={{fontSize:"20px"}}>Connect to Your Health Portal</h2>
           <div className="popup-container">
            <div className="main-poup-heading">
              <span style={{textAlign:"left"}}>You are about to securely access your health records through your provider’s patient portal.</span>
              <div className="sub-h-popup">
                    <h3>Next Steps</h3>
                    <span>You’ll be redirected to login. Have your credentials ready.</span>
              </div>
              <div className="sub-h-popup">
                    <h3>Data Privacy</h3>
                    <span>You control what information is shared and for how long.</span>
              </div>
            </div>


           </div>

            {/* Proceed button */}
            <div className="ins-modal-actions">
              <button className="ins-btn-primary" onClick={handleConfirmStep2}>
                Proceed
              </button>
              <button
                className="ins-btn-secondary"
                onClick={() => setConfirmInsuranceModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectingBoard;
