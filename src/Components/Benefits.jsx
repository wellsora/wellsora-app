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

// const getData = async () => {
//   try {
//     const response = await axios.get('https://benefits-service-dot-wellsora-app.uc.r.appspot.com/api/benefits?limit=100', {
//       withCredentials: true, // Include cookies with the request
//     });
//     console.log('Data:', response.data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

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
  // getData();

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
          <button onClick={openModal} className="create-plan-btn">
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

      {/* <div className="main-ccontainer-for-benefits">
      <span>Please Connect your ensurance to View the benefits</span>
    </div> */}
    </>
  );
};

export default Benefits;
