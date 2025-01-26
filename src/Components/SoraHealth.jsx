import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import logoimage from "../assets/logoimage.svg";
import { FaRegCalendarAlt, FaHandHoldingHeart, FaSearch, FaCog, FaLock } from 'react-icons/fa'; // Icons from react-icons
import { BsHeartPulseFill } from 'react-icons/bs'; // Another icon from react-icons
import { IoIosStats } from 'react-icons/io'; // Stats icon from react-icons
import { TbLogout2 } from "react-icons/tb";
import ConnectingBoard from "./ConnectingBoard";
import Dashboard_left from "./dash-right";
import { Link } from 'react-router-dom'; 

import Privacy from './Privacy';
import Benefits from './Benefits';
import { Caregiver } from './Caregiver';
import Settings from "./Settings"


// API URL and key (You should ideally store the key securely)
const apiUrl = process.env.apiUrl;
const apiKey =process.env.apiKey
const initialAccordionData = [
  {
    number: "01",
    title: "What is emergency cost coverage in the U.S., and how does it work?",
    content: [
      "Emergency cost coverage is how insurance pays for emergencies. The Affordable Care Act (ACA) requires most plans to cover emergencies without approval, at the same cost in or out of network. You may still owe deductibles, copays (copayments), or other costs. Check your plan.",
    ],
    open: false,
  },
  {
    number: "02",
    title: "What factors typically influence the cost of a hospital stay?",
    content: [
      "The cost of a hospital stay depends on the type of care needed, like surgery or urgent care (UCU), length of stay, hospital location, and insurance. Extra costs include tests, medications, specialist visits, and follow-up care. Understanding these factors helps plan hospital expenses.",
    ],
    open: false,
  },
  {
    number: "03",
    title:
      "What factors influence prescription drug costs and how can you manage them?",
    content: [
      "Prescription drug costs depend on factors like the type of medication (generic or brand-name), insurance coverage, pharmacy location, and available discounts. Without insurance, prices can be high, but discount cards, manufacturer coupons, and assistance programs can help lower costs. Always compare options carefully",
    ],
    open: false,
  },
  {
    number: "04",
    title:
      "Why are regular appointments important for managing high blood pressure?",
    content: [
      "High blood pressure appointments are vital to monitor your condition, adjust medications, and prevent complications like heart disease or stroke. Doctors measure your blood pressure, review your lifestyle, and may order tests. Regular visits help manage risks and support long-term health effectively.",
    ],
    open: false,
  },
  {
    number: "05",
    title: "What influences the cost of mental health services?",
    content: [
      "Mental health service costs depend on factors like therapy type (individual, group, or specialized), provider expertise, session length, and insurance coverage. Without insurance, costs vary widely, but sliding-scale fees, community programs, or telehealth options may help make care more affordable.",
    ],
    open: false,
  },
];

const Sorahealth = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [accordionData, setAccordionData] = useState(initialAccordionData);
  const [searchQuery, setSearchQuery] = useState("");
  const [apiResult, setApiResult] = useState(""); // State to store the API result

  const [activeScreen, setActiveScreen] = useState("Sora Health");

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


  useEffect(() => {
    const date = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    setCurrentDate(formattedDate);
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

  const handleAccordionToggle = (index) => {
    const updatedAccordionData = [...accordionData];
    updatedAccordionData[index].open = !updatedAccordionData[index].open;
    setAccordionData(updatedAccordionData);
  };

  //   const filteredData = accordionData.filter(item => {
  //     const searchLowerCase = searchQuery.toLowerCase();
  //     const titleMatch = item.title.toLowerCase().includes(searchLowerCase);
  //     const contentMatch = item.content.some(contentItem => contentItem.toLowerCase().includes(searchLowerCase));
  //     return titleMatch || contentMatch;
  //   });

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
           Connecting Records
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
           Find a Caregiver
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
    
      <div style={{ gap: "112px" }} className="right-header">
        <div style={{ width: "40%" }} className="header-left-container">
          <span className="Title-name">Sora health+</span>
        </div>
        <div className="header-right-container">
          <div className="header-bar">
            <div className="notification-icon">
              <FaBell />
            </div>
            <div className="profile-container">
              <img
                src="https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197908.png"
                alt="User Profile"
                className="profile-picture"
              />
              <HiDotsVertical size={20} />
            </div>
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

      <div className="accordion">
        {accordionData.map((item, index) => (
          <details key={index} open={item.open}>
            <summary
              onClick={(e) => {
                e.preventDefault();
                handleAccordionToggle(index);
              }}
            >
              <span className="number">{item.number}</span>
              <span className="detail-title">{item.title}</span>
              <span className="expand-icon">{item.open ? "-" : "+"}</span>
            </summary>
            {item.content && (
              <div className="content">
                <ul style={{ listStyle: "none" }}>
                  {item.content.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              </div>
            )}
          </details>
        ))}
      </div>
      </div>
      </div>
    
  );
};

export default Sorahealth;
