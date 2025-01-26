import React from "react";
import { FaBell, FaWheelchair } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { TbVaccine } from "react-icons/tb";
import { TbWheelchair } from "react-icons/tb";
import "../App.css";
import { GiMicroscope } from "react-icons/gi";
import { FaHospital } from "react-icons/fa";
import { LuHeartPulse } from "react-icons/lu";
import { IoAnalytics } from "react-icons/io5";
import { GiBrain } from "react-icons/gi";
import { MdChecklist } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { FaHeartbeat } from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";



const getData = async () => {
  try {
    const response = await axios.get(
      "https://benefits-service-dot-wellsora-app.uc.r.appspot.com/api/benefits?limit=100",
      {
        withCredentials: true, // Include cookies with the request
      }
    );
    console.log("Data:", response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const Benefits = () => {
  const [isModalOpen, setModalOpen] = useState(false); // Connect Insurance Modal
  const [isInsuranceChosen, setInsuranceChosen] = useState(false); // Choose Insurance Modal
  const [selectedInsurance, setSelectedInsurance] = useState(null); // Store selected insurance

  // Open and close modal logic
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
  getData();

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
        style={{ display: "flex", alignItems: "center", padding: "20px 80px" }}
      >
        {/* Search Input with Icon */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginRight: "10px",
            backgroundColor: "#EFF8FC",
          }}
        >
          <FiSearch style={{ marginRight: "10px", color: "#888" }} />
          <input
            type="text"
            placeholder="Search procedures, treatments or services..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "14px",
              backgroundColor: "#EFF8FC",
            }}
          />
        </div>

        {/* Button */}
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#1B779B", // Adjust color to match the design
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search Benefits
        </button>
      </div>
      <div className="main-undersearch">
        <div className="span-div">
          <span className="undersearch-text">
            Lorem ipsum dolor sit amet consectetur. Sem ac at velit lacinia
            pellentesque vestibulum sed. Nulla aliquam dolor quam adipiscing
            ultrices. Egestas blandit vitae massa rhoncus imperdiet vulputate
            ornare nunc. Enim libero metus cursus volutpat risus.Lorem ipsum
            dolor sit amet consectetur. Sem ac at velit lacinia pellentesque
            vestibulum sed.{" "}
          </span>
        </div>
      </div>
      <div className="insurance-container">
        <div className="left-c">
          <div className="element-container">
            <div className="ico-text">
              <CiSearch size={20} color="#007b9e" />
              <div className="text-span-container">
                <span>Preventive & screening services</span>
              </div>
            </div>
            <span className="description">
              Welcome Visit - Cancer Screenings - Wellness Visits
            </span>
          </div>
          <div className="element-container">
            <div className="ico-text">
              <TbVaccine size={20} color="#007b9e" />
              <div className="text-span-container">
                <span>Vaccines</span>
              </div>
            </div>
            <span className="description">Flu - COVID 19 - Pneoumococal</span>
          </div>
          <div className="element-container">
            <div className="ico-text">
              <GiMicroscope size={20} color="#007b9e" />
              <div className="text-span-container">
                <span>Diagnostic & Laboratory Services</span>
              </div>
            </div>
            <span className="description">
              Lab Tests- Colonoscopies - Eye Exams
            </span>
          </div>
          <div className="element-container">
            <div className="ico-text">
              <FaWheelchair size={20} color="#007b9e" />
              <div className="text-span-container">
                <span>Medical Equipment & Supplies</span>
              </div>
            </div>
            <span className="description">
              Wheelchairs - Hospital Beds - CPAP
            </span>
          </div>
          <div className="element-container">
            <div className="ico-text">
              <FaHospital size={20} color="#007b9e" />
              <div className="text-span-container">
                <span>Surgical & Treatment Services</span>
              </div>
            </div>
            <span className="description">
              Surgery - Chemotherapy - Hospital Care
            </span>
          </div>
        </div>
        <div className="right-c">
          <div className="element-container">
            <div className="ico-text">
              <LuHeartPulse size={20} color="#007b9e" />
              <div className="text-span-container">
                <span>Therapies & Rehabilitation</span>
              </div>
            </div>
            <span className="description">
              Physical Therapy- Speech Therapy - Cardiac Rehab
            </span>
          </div>
          <div className="element-container">
            <div className="ico-text">
              <GiBrain size={20} color="#007b9e" />
              <div className="text-span-container">
                <span>Mental Health Services</span>
              </div>
            </div>
            <span className="description">
              Counseling - Inpatient Care - Assessment
            </span>
          </div>
          <div className="element-container">
            <div className="ico-text">
              <MdChecklist size={20} color="#007b9e" />
              <div className="text-span-container">
                <span>Cancer & Specialized Screening</span>
              </div>
            </div>
            <span className="description">
              Breast Cancer - Colorectal - Macular
            </span>
          </div>
          <div className="element-container">
            <div className="ico-text">
              <IoAnalytics size={20} color="#007b9e" />
              <div className="text-span-container">
                <span>Diabetic Care</span>
              </div>
            </div>
            <span className="description">Training -Monitors - Insulin</span>
          </div>
          <div className="element-container">
            <div className="ico-text">
              <CiSearch size={20} color="#007b9e" />
              <div className="text-span-container">
                <span>Other</span>
              </div>
            </div>
            <span className="description">Other Care - Other Services</span>
          </div>
        </div>
      </div>
      {/* Connect Insurance Modal */}
      {isModalOpen && (
        <div className="ins-modal-overlay">
          <div className="svg-model">
          <svg
            width="102"
            height="132"
            viewBox="0 0 102 132"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M114.412 -14C127.912 -14 139.219 -8.99815 148.331 1.00556C157.444 11.0093 162 22.9056 162 36.6944C162 39.1278 161.865 41.5273 161.595 43.8931C161.325 46.2588 160.852 48.5907 160.178 50.8889H109.552L95.7825 30.2056C95.1075 29.1241 94.1625 28.2454 92.9475 27.5694C91.7325 26.8935 90.45 26.5556 89.1 26.5556C87.345 26.5556 85.7588 27.0963 84.3412 28.1778C82.9238 29.2593 81.945 30.6111 81.405 32.2333L70.47 65.0833L63.3825 54.5389C62.7075 53.4574 61.7625 52.5787 60.5475 51.9028C59.3325 51.2269 58.05 50.8889 56.7 50.8889H1.8225C1.1475 48.5907 0.675 46.2588 0.405 43.8931C0.135 41.5273 0 39.1954 0 36.8972C0 22.9731 4.5225 11.0093 13.5675 1.00556C22.6125 -8.99815 33.885 -14 47.385 -14C53.865 -14 59.9738 -12.7157 65.7113 -10.1472C71.4488 -7.5787 76.545 -3.9963 81 0.599999C85.32 -3.9963 90.3487 -7.5787 96.0863 -10.1472C101.824 -12.7157 107.933 -14 114.412 -14ZM81 132C78.57 132 76.2412 131.561 74.0137 130.682C71.7862 129.803 69.795 128.485 68.04 126.728L13.77 72.1806C12.96 71.3694 12.2175 70.5583 11.5425 69.7472C10.8675 68.9361 10.1925 68.0574 9.5175 67.1111H52.245L66.015 87.7944C66.69 88.8759 67.635 89.7546 68.85 90.4305C70.065 91.1065 71.3475 91.4444 72.6975 91.4444C74.4525 91.4444 76.0725 90.9037 77.5575 89.8222C79.0425 88.7407 80.055 87.3889 80.595 85.7667L91.53 52.9167L98.415 63.4611C99.225 64.5426 100.238 65.4213 101.452 66.0972C102.668 66.7731 103.95 67.1111 105.3 67.1111H152.28L150.255 69.5444L148.23 71.9778L93.7575 126.728C92.0025 128.485 90.045 129.803 87.885 130.682C85.725 131.561 83.43 132 81 132Z"
              fill="#4CA7A8"
              fill-opacity="0.12"
            />
          </svg>
          </div>

          <div className="ins-modal-content">
          <div className="modal-header">
                          <FaHeartbeat
                            size={40}
                            style={{ color: "#EA7551", fontSize: "1em" }}
                          />
             </div>
            <h2 className="ins-modal-title">Connect Insurance</h2>
            <p className="ins-modal-description">
              Access your all insurance in one place
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
            <div className="ins-secure-badge">
              <span>
              <TbVaccine size={20} />
              <span>HIPP Secure</span>
              </span>
              <span>Encrypted</span>
            </div>
          
          </div>
        </div>
      )}

      {/* Choose Insurance Modal */}
      {isInsuranceChosen && (
        <div className="ins-modal-overlay">
          <div className="svg-model">
          <svg
            width="102"
            height="132"
            viewBox="0 0 102 132"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M114.412 -14C127.912 -14 139.219 -8.99815 148.331 1.00556C157.444 11.0093 162 22.9056 162 36.6944C162 39.1278 161.865 41.5273 161.595 43.8931C161.325 46.2588 160.852 48.5907 160.178 50.8889H109.552L95.7825 30.2056C95.1075 29.1241 94.1625 28.2454 92.9475 27.5694C91.7325 26.8935 90.45 26.5556 89.1 26.5556C87.345 26.5556 85.7588 27.0963 84.3412 28.1778C82.9238 29.2593 81.945 30.6111 81.405 32.2333L70.47 65.0833L63.3825 54.5389C62.7075 53.4574 61.7625 52.5787 60.5475 51.9028C59.3325 51.2269 58.05 50.8889 56.7 50.8889H1.8225C1.1475 48.5907 0.675 46.2588 0.405 43.8931C0.135 41.5273 0 39.1954 0 36.8972C0 22.9731 4.5225 11.0093 13.5675 1.00556C22.6125 -8.99815 33.885 -14 47.385 -14C53.865 -14 59.9738 -12.7157 65.7113 -10.1472C71.4488 -7.5787 76.545 -3.9963 81 0.599999C85.32 -3.9963 90.3487 -7.5787 96.0863 -10.1472C101.824 -12.7157 107.933 -14 114.412 -14ZM81 132C78.57 132 76.2412 131.561 74.0137 130.682C71.7862 129.803 69.795 128.485 68.04 126.728L13.77 72.1806C12.96 71.3694 12.2175 70.5583 11.5425 69.7472C10.8675 68.9361 10.1925 68.0574 9.5175 67.1111H52.245L66.015 87.7944C66.69 88.8759 67.635 89.7546 68.85 90.4305C70.065 91.1065 71.3475 91.4444 72.6975 91.4444C74.4525 91.4444 76.0725 90.9037 77.5575 89.8222C79.0425 88.7407 80.055 87.3889 80.595 85.7667L91.53 52.9167L98.415 63.4611C99.225 64.5426 100.238 65.4213 101.452 66.0972C102.668 66.7731 103.95 67.1111 105.3 67.1111H152.28L150.255 69.5444L148.23 71.9778L93.7575 126.728C92.0025 128.485 90.045 129.803 87.885 130.682C85.725 131.561 83.43 132 81 132Z"
              fill="#4CA7A8"
              fill-opacity="0.12"
            />
          </svg>
          </div>
          <div className="ins-modal-content">
            <div className="icons-center">
          <MdLocalHospital size={50} style={{ color: "#EA7551", fontSize: "1em" }}/>

            </div>
            <h2 className="ins-modal-title">Choose your Insurance</h2>
            <p className="ins-modal-description">
              Choose your insurance from these to connect your
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
      {/* <div className="main-ccontainer-for-benefits">
      <span>Please Connect your ensurance to View the benefits</span>
    </div> */}
    </>
  );
};

export default Benefits;
