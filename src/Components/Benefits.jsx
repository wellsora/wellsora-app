import React,{useEffect} from "react";
import { FaBell, FaWheelchair } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { TbVaccine } from "react-icons/tb";
import "../App.css";

import { useState } from "react";
import axios from "axios";
import { FaHeartbeat } from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";
import Cookies from "js-cookie"; // Import js-cookie

const Benefits = () => {
  const [isModalOpen, setModalOpen] = useState(false); // Connect Insurance Modal
  const [isInsuranceChosen, setInsuranceChosen] = useState(false); // Choose Insurance Modal
  const [selectedInsurance, setSelectedInsurance] = useState(null); // Store selected insurance
  const [benefits, setBenefits] = useState([]);
   const [searchQuery, setSearchQuery] = useState("");
    const [apiResult, setApiResult] = useState(""); // State to store the API result
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
      console.log(category)
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
    <>
      <div style={{ gap: "38em" }} className="right-header">
        <div style={{ width: "21%" }} className="header-left-container">
          <span
            style={{ fontWeight: "800", fontSize: "21px" }}
            className="name"
          >
            Your personalized benefits
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "flexend",
            gap: "20px",
            width: "21%",
          }}
          className="header-right-container"
        >
          {/* Notification Icon */}
          <button onClick={openModal} className="connect-insurancee">
            Connect Insurance
          </button>
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
     <div
           style={{
             display: "flex",
             alignItems: "center",
             padding: "30px 78px",
             width: "99%",
             paddingBottom: "0%",
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
               placeholder="e.g. what symptoms signal hypertension?"
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
             style={{
               padding: "10px 83px",
               backgroundColor: "#1B779B",
               color: "white",
               border: "none",
               borderRadius: "5px",
               cursor: "pointer",
             }}
             onClick={fetchApiData} // Call the API when the button is clicked
           >
             Search
           </button>
         </div>
   
         <div className="main-undersearch">
           <div className="span-div">
             <span className="undersearch-text">
               {apiResult ||
                 "Sora Health+ is your caregiving companion. We provide resources, tips, and personalized guidance to help you care for loved ones with confidence. Think of us as a supportive friend, simplifying caregiving. For medical concerns or emergencies, please call your doctor immediately."}
             </span>
           </div>
         </div>
   

      <div className="insurance-container">
        <div className="overlflow-control">
        {Object.keys(groupedBenefits).map((category) => (
          <details key={category} className="category-details">
            <summary className="category-summary">
              <span>{category} ({groupedBenefits[category].length})</span>
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
                    <span className="benefit-name">{benefit.benefitName}</span>
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
      <p><strong>Benefit Category:</strong> {modalState.benefit.benefitCategory}</p>
      <p><strong>Benefit Information:</strong> {modalState.benefit.benefitInformation}</p>
      <p><strong>Benefit Cost:</strong> {modalState.benefit.benefitCost}</p>
      <p><strong>Essential Info:</strong> {modalState.benefit.essentialInfo}</p>
      <p><strong>Provider:</strong> {modalState.benefit.benefitProvider}</p>
      <button onClick={closeModal}>Close</button>
    </div>
  </div>
)}

      {/* <div className="main-ccontainer-for-benefits">
      <span>Please Connect your ensurance to View the benefits</span>
    </div> */}
    </>
  );
};

export default Benefits;
