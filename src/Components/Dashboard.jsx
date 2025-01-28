import React, { useState, useEffect, useRef } from "react";
import logoimage from "../assets/logoimage.svg";
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
import ConnectingBoard from "./ConnectingBoard";
import Dashboard_left from "./dash-right";
import Sorahealth from "./SoraHealth";
import Privacy from "./Privacy";
import Benefits from "./Benefits";
import { Caregiver } from "./Caregiver";
import Settings from "./Settings";
import { FaBell } from "react-icons/fa";
import { FaGoogle, FaApple, FaMicrosoft } from "react-icons/fa";
import Modal from "./Modal";
import { HiDotsVertical } from "react-icons/hi";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { ActionDropdown } from "./DropDown/ActionDropdown";
import profileImg from "../assets/image.png"

const getStatusColors = (status) => {
  switch (status.toLowerCase()) {
    case "new":
      return { color: "#FB5457", backgroundColor: "#FB54571A" };
    case "in progress":
      return { color: "#FFCF33", backgroundColor: "#FFCF331A" };
    case "resolved":
      return { color: "rgb(51 143 65)", backgroundColor: "#33FF521A" };
    default:
      return { color: "gray", backgroundColor: "lightgray" };
  }
};

const Dashboard = () => {
  const [activeScreen, setActiveScreen] = useState("Dashboard");

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

  const getFormEntries = JSON.parse(localStorage.getItem("formEntries")) || [];
  const [eventList, setEventList] = useState(getFormEntries);

  const [currentDate, setCurrentDate] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const todayRef = useRef(null);
  const [editingEvent, setEditingEvent] = useState(null); // Added state for edit mode
  const [todaysEvents, setTodaysEvents] = useState([]);

  // Date configuration
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();


  const [selectedOptions, setSelectedOptions] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
  });


  // Handler to set selected option for each question, ensuring only one option is selected
  const handleOptionSelect = (question, option) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [question]: option, // Only update the selected option for that question
    }));
  };

  // Generate time slots for the timeline
  const timeSlots = Array.from({ length: 24 }, (_, index) => {
    const hour = index % 12 || 12; // Convert to 12-hour format
    const paddedHour = String(hour).padStart(2, '0'); // Add leading zero if needed
    const period = index < 12 ? "AM" : "PM"; // Determine AM/PM
    return `${paddedHour}:00 ${period}`; // Construct the time slot
  });


  useEffect(() => {
    const dateOptions = {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    setCurrentDate(new Date().toLocaleDateString("en-US", dateOptions));

    if (todayRef.current) {
      todayRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, []);

  
  useEffect(() => {
    // Fetch events from localStorage
    const storedEvents = JSON.parse(localStorage.getItem("formEntries") || "[]");
  
    // Filter events for today
    // console.log('Stored Events:', storedEvents);
    const filteredEvents = storedEvents.filter(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0); // Normalize event date to midnight

      return eventDate.getDate() === today.getDate(); // Compare normalized event date with today
    }).map(event => ({
        ...event,
        // Convert time to 12-hour AM/PM format
        time: new Date(`1970-01-01T${event.time}`).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      }));
  
    // Set today's events in state
    setTodaysEvents(filteredEvents);

    // Log today's events for debugging
    console.log('Filtered Events for Today:', filteredEvents);
  
  }, [eventList, todayRef]);

  
  const handleDateClick = (day) => {
    console.log("Clicked date: ", day);
  
    // Construct the selected date using the current year and month
    const selectedDate = new Date(currentYear, currentMonth, day);
    selectedDate.setHours(0, 0, 0, 0); // Normalize the selected date to midnight
  
    // Fetch events from localStorage
    const storedEvents = JSON.parse(localStorage.getItem("formEntries") || "[]");
  
    // Filter events for the selected day
    const filteredEvents = storedEvents.filter(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0); // Normalize event date to midnight
      
      return eventDate.getTime() === selectedDate.getTime(); // Compare dates
    }).map(event => ({
      ...event,
      // Convert time to 12-hour AM/PM format
      time: new Date(`1970-01-01T${event.time}`).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
    }));
  
    // Update the selected date and today's events
    setSelectedDate(day);
    setTodaysEvents(filteredEvents);
  
    // Log for debugging
    console.log("Filtered Events for Selected Date:", filteredEvents);
  };


  const handleCreateClick = () => {
    setEditingEvent(null);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingEvent(null);
  };

  const handleEdit = (event) => {
    // Added handleEdit function
    setEditingEvent(event);
    setModalVisible(true);
  };

  const handleDelete = (eventId) => {
    // Added handleDelete function
    if (window.confirm("Are you sure you want to delete this event?")) {
      const updatedEvents = eventList.filter((event) => event.id !== eventId);
      setEventList(updatedEvents);
      localStorage.setItem("formEntries", JSON.stringify(updatedEvents));
    }
  };

  return (
    <div className="dash-container">
      <div className="left-container">
        <div className="dash-logo">
          <span className="logo">Wellsora</span>
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
            <span className="name">Welcome, Bernie</span>
          </div>
          <div className="header-right-container">
            <div className="header-bar">
              {/* Left Button */}
              <button onClick={handleCreateClick} className="create-plan-btn">
                Create New Plan
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
                  src={profileImg}
                  alt="User Profile"
                  className="profile-picture"
                />
                <HiDotsVertical style={50} />
              </div>
            </div>
          </div>
        </div>
        <div className="main-dashboard">
          <div className="main-dash-left">
            <div className="inner_dash">
              <div className="calendar">
                {[...Array(daysInMonth)].map((_, index) => {
                  const day = index + 1;
                  const isSelected = day === selectedDate;
                  const isToday = day === currentDay;

                  return (
                    <div
                      key={day}
                      className={`calendar-day ${
                        isSelected ? "selected" : ""
                      } ${isToday ? "today" : ""}`}
                      onClick={() => handleDateClick(day)}
                      ref={isToday ? todayRef : null} // Reference the element for today's date
                    >
                      <div className="day-number">{day}</div>
                      <div className="day-label">
                        {new Date(
                          currentYear,
                          currentMonth,
                          day
                        ).toLocaleString("en-US", { weekday: "short" })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="envets_dash_container">
                {/* <div className="upcomming-heading">
                                    <span className="upcoming-heading">
                                        Upcoming events
                                    </span>
                                </div> */}
                <div className="table-container">
                  <div className="search-bar">
                    <div>
                      Show
                      <select>
                        <option value="10">5</option>
                        <option value="20">10</option>
                        <option value="10">15</option>
                        <option value="20">20</option>
                      </select>
                      entries
                    </div>
                    <div class="search-container2">
                      <i class="search-icon"></i>
                      <input type="text" placeholder="Search..." />
                    </div>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Scheduled date</th>
                        <th>Activity</th>
                        <th>Services</th>
                        <th>Caring</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(eventList) ? (
                        eventList.map((event, index) => {
                          // Usage in component
                          const { color, backgroundColor } = getStatusColors(
                            event.status
                          );
                          return (
                            <tr key={event.id || index}>
                              <td>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                  className="sch"
                                >
                                <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                                  <span
                                    style={{ fontSize: "12px", color: "#777" }}
                                  >
                                  {new Date(`1970-01-01T${event.time}`).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true })}
                                  </span>
                                </div>
                              </td>
                              <td>
                                {event.appointmentName}
                                <div
                                  style={{ fontSize: "12px", color: "#777" }}
                                >
                                  {event.location}
                                </div>
                              </td>
                              <td>
                                <div className="services-dropdown">
                                  {event.service}
                                </div>
                              </td>
                              <td>
                                <button
                                  style={{
                                    border: "none",
                                    color: color,
                                    backgroundColor: backgroundColor,
                                    padding: "5px 10px",
                                    cursor: "pointer",
                                  }}
                                  className="caring-btn"
                                >
                                  <GoDotFill
                                    style={{
                                      position: "relative",
                                      bottom: "-3px",
                                      left: "-2px",
                                      fontSize: "medium",
                                    }}
                                  />
                                  <span
                                    style={{ color: "black", fontSize: "12px" }}
                                  >
                                    {event.firstName +" "+ event.lastName}
                                  </span>
                                </button>
                              </td>

                              <td>
                                <ActionDropdown
                                  onEdit={() => handleEdit(event)}
                                  onDelete={() => handleDelete(event.id)}
                                />
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            style={{ textAlign: "center", padding: "20px" }}
                          >
                            No appointments scheduled
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="main-dash-right">
            <div className="timeline-container">
              <div className="timeline">
                {timeSlots.map((time, index) => {
                  return (
                    <div className="time-slot" key={index}>
                      {time}
                      {todaysEvents
                        .filter((event) => {
                            // Extract hour and period (AM/PM) from event.time and time
                            const extractHourAndPeriod = (timeStr) => {
                              const [hour, period] = timeStr.split(' ');
                              return { hour: hour.split(':')[0], period };
                            };

                            const eventTimeParts = extractHourAndPeriod(event.time);
                            const slotTimeParts = extractHourAndPeriod(time);

                            // Compare hour and period (AM/PM)
                            const isSameHour = eventTimeParts.hour === slotTimeParts.hour;
                            const isSamePeriod = eventTimeParts.period === slotTimeParts.period;

                            return isSameHour && isSamePeriod;
                        })
                        .map((event, eventIndex) => {
                          const { color, backgroundColor } = getStatusColors(
                            event.status
                          );
                          return (
                            <div style={{color: color,
                                    backgroundColor: backgroundColor}} className="event" key={eventIndex}>
                              <div className="details">
                                <div style={{width:"19em"}}>
                                  <span>

                                <strong>{event.appointmentName}</strong>
                                  </span>
                                </div>
                                <div>{new Date(event.date).toLocaleDateString(
                                      "en-US",
                                      {
                                        month: "long",
                                        day: "2-digit",
                                        year: "numeric",
                                      }
                                    )}</div>
                                {/* <div>{event.address}</div> */}
                              </div>
                              <div className="icons">
                                <FaGoogle
                                  size={15}
                                  style={{
                                    marginRight: "5px",
                                    cursor: "pointer",
                                  }}
                                />
                                <FaMicrosoft
                                  size={15}
                                  style={{
                                    marginRight: "5px",
                                    cursor: "pointer",
                                  }}
                                />
                                <FaApple
                                  size={17}
                                  style={{ cursor: "pointer" }}
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        eventList={eventList}
        setEventList={setEventList}
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        editingEvent={editingEvent}
      />
    </div>
  );
};

export default Dashboard;
