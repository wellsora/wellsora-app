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
import profileImg from "../assets/image.png";
import { IoChevronForwardSharp } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesCount, setEntriesCount] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEvents, setFilteredEvents] = useState(eventList);

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
    const paddedHour = String(hour).padStart(2, "0"); // Add leading zero if needed
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
    const storedEvents = JSON.parse(
      localStorage.getItem("formEntries") || "[]"
    );

    // Filter events for today
    // console.log('Stored Events:', storedEvents);
    const filteredEvents = storedEvents
      .filter((event) => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0); // Normalize event date to midnight

        return eventDate.getDate() === today.getDate(); // Compare normalized event date with today
      })
      .map((event) => ({
        ...event,
        // Convert time to 12-hour AM/PM format
        time: new Date(`1970-01-01T${event.time}`).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      }));

    // Set today's events in state
    setTodaysEvents(filteredEvents);

    // Log today's events for debugging
    console.log("Filtered Events for Today:", filteredEvents);
  }, [eventList, todayRef]);

  useEffect(() => {
    const filtered = eventList.filter(
      (event) =>
        event.appointmentName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm, eventList]);

  // Handle entries per page change
  const handleEntriesChange = (e) => {
    setEntriesCount(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when entries per page changes
  };

  // Handle pagination
  const totalPages = Math.ceil(filteredEvents.length / entriesCount);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * entriesCount,
    currentPage * entriesCount
  );
  const handleDateClick = (day) => {
    console.log("Clicked date: ", day);

    // Construct the selected date using the current year and month
    const selectedDate = new Date(currentYear, currentMonth, day);
    selectedDate.setHours(0, 0, 0, 0); // Normalize the selected date to midnight

    // Fetch events from localStorage
    const storedEvents = JSON.parse(
      localStorage.getItem("formEntries") || "[]"
    );

    // Filter events for the selected day
    const filteredEvents = storedEvents
      .filter((event) => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0); // Normalize event date to midnight

        return eventDate.getTime() === selectedDate.getTime(); // Compare dates
      })
      .map((event) => ({
        ...event,
        // Convert time to 12-hour AM/PM format
        time: new Date(`1970-01-01T${event.time}`).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
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
            <div className="name_des">
              <span className="name">Welcome, Bernie</span>
              <svg
                className="hyfi"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m16.1 48.5c-.5-.1-.9-.2-1.4-.4s-.9-.3-1.3-.5c-.9-.4-1.7-.9-2.5-1.5-1.6-1.1-2.9-2.6-3.9-4.4-1-1.7-1.6-3.7-1.7-5.6-.1-1 0-1.9.1-2.9.1-.5.2-.9.3-1.4s.3-.9.4-1.4l.1 1.4c0 .5.1.9.2 1.4.1.9.3 1.8.5 2.6.4 1.7 1 3.3 1.9 4.8s1.9 2.9 3.2 4.2c.6.6 1.3 1.2 2 1.8.3.3.7.6 1.1.9zm-.3 3.6c-.3.2-.7.3-1.1.4s-.7.2-1.1.2c-.7.1-1.5.2-2.3.1-1.5-.1-3.1-.5-4.4-1.2-1.4-.7-2.6-1.8-3.4-3.1-.4-.6-.8-1.3-1.1-2-.1-.3-.2-.7-.3-1.1 0-.3-.1-.6-.1-1 .3.3.5.6.7.8.3.3.5.6.7.8.5.5.9 1 1.4 1.4 1 .9 2 1.7 3.2 2.3 1.1.6 2.4 1.1 3.6 1.5.6.2 1.3.3 2 .5.3.1.7.1 1 .2.5.1.8.1 1.2.2m22.6-48.6c.5.1.9.3 1.4.5s.9.4 1.3.6c.9.5 1.7 1 2.5 1.6 1.6 1.2 2.9 2.8 3.8 4.6s1.4 3.8 1.4 5.7c0 1-.1 1.9-.3 2.9-.1.5-.2.9-.4 1.4s-.3.9-.5 1.3l-.1-1.4c0-.5 0-.9-.1-1.4l-.3-2.7c-.3-1.7-.9-3.4-1.7-5s-1.8-3-3-4.3c-.6-.7-1.3-1.3-1.9-2-.3-.3-.7-.6-1.1-.9zm8.7-.4c.4.1.7.2 1 .4.3.1.7.3 1 .5.6.4 1.2.8 1.8 1.3 1.1 1 2 2.2 2.5 3.6.6 1.4.8 2.9.6 4.4-.1.7-.3 1.4-.5 2.1-.1.3-.3.7-.4 1-.2.3-.3.6-.6.9v-1-1c0-.7-.1-1.3-.1-1.9-.2-1.3-.4-2.5-.9-3.6-.5-1.2-1.1-2.2-1.8-3.3-.4-.5-.8-1.1-1.2-1.6-.2-.3-.4-.5-.7-.8-.2-.5-.5-.8-.7-1"
                  fill="#42ade2"
                />
                <path
                  d="m10 18c-2 .9-2.7 3.3-1.8 5.3l12.6 26.3 7-3.3-12.6-26.4c-.9-2-3.2-2.9-5.2-1.9m33.1 20.9 7.4-3.5-14.4-30c-1-2-3.4-2.9-5.5-1.9-2 1-2.9 3.4-1.9 5.5z"
                  fill="#ffdd67"
                />
                <path
                  d="m30.7 3.4c-.2.1-.4.2-.6.4 1.9-.5 3.9.4 4.8 2.2l14.4 30 1.3-.6-14.4-30c-1-2.1-3.4-3-5.5-2"
                  fill="#eba352"
                />
                <path
                  d="m27.8 46.2 7.7-3.7-14.7-30.6c-1-2.1-3.6-3.1-5.7-2.1s-3 3.6-2 5.7z"
                  fill="#ffdd67"
                />
                <path
                  d="m15.1 9.9c-.2.1-.4.2-.6.4 1.9-.5 4.1.4 5 2.3l9.1 19.1 2.2 1.3-10-21c-1-2.2-3.5-3.1-5.7-2.1"
                  fill="#eba352"
                />
                <path
                  d="m34.3 40.1 7.7-3.7-14.7-30.6c-1-2.1-3.6-3.1-5.7-2-2.1 1-3 3.6-2 5.7z"
                  fill="#ffdd67"
                />
                <path
                  d="m21.6 3.7c-.2.1-.4.3-.6.4 1.9-.5 4.1.4 5 2.3l10.3 21.6 2.2 1.3-11.2-23.5c-1-2.2-3.6-3.1-5.7-2.1m-11.6 14.3c-.2.1-.4.2-.6.4 1.8-.5 3.7.4 4.5 2.2l7.5 15.7 2.2 1.3-8.4-17.6c-.9-2.1-3.2-3-5.2-2"
                  fill="#eba352"
                />
                <path
                  d="m60.8 15c-2.7-2.1-7.1.2-9.3 7.4-1.5 5-1.7 6.5-4.9 8l-1.8-3.7s-28.4 13.7-27.3 15.9c0 0 3.4 10.6 9.2 15.5 8.6 7.4 28.7-.5 29.6-19.6.5-11.1 7.4-21.2 4.5-23.5"
                  fill="#ffdd67"
                />
                <g fill="#eba352">
                  <path d="m60.8 15c-.5-.4-1.1-.6-1.7-.7.1.1.3.1.4.2 3 2.3-.1 7.6-1.8 12.4-1.4 3.8-2.6 7.7-2.4 11.5.8 16.6-15.9 24.5-25.9 21.5 9.8 4.1 28-3.7 27.2-21-.2-3.8.9-7.5 2.4-11.5 1.6-4.8 4.7-10.1 1.8-12.4" />
                  <path d="m47.5 30c-6.2.7-15.3 9.6-8.9 19.3-4.7-9.8 3-16.4 7.9-18.7.5-.4 1-.6 1-.6" />
                </g>
              </svg>
            </div>
            <span style={{ color: "#909096",width:"30em" }}>
              Here's what's happening with your appointments today
            </span>
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
                {(() => {
                  // Determine the weekday of the first day of the current month
                  const firstDayOfMonth = new Date(
                    currentYear,
                    currentMonth,
                    1
                  ).getDay();
                  // 'daysInMonth' is already defined in your code.
                  // Determine the last date of the previous month
                  const prevMonthLastDate = new Date(
                    currentYear,
                    currentMonth,
                    0
                  ).getDate();

                  // Build an array to hold all the day objects for the calendar grid.
                  const calendarDays = [];

                  // 1. Add the trailing days from the previous month.
                  // If the first day of the current month is not Sunday (getDay() !== 0),
                  // then add that many days from the previous month.
                  for (let i = firstDayOfMonth; i > 0; i--) {
                    const day = prevMonthLastDate - i + 1;
                    calendarDays.push({
                      day,
                      isCurrentMonth: false,
                      date: new Date(currentYear, currentMonth - 1, day),
                    });
                  }

                  // 2. Add all days of the current month.
                  for (let i = 1; i <= daysInMonth; i++) {
                    calendarDays.push({
                      day: i,
                      isCurrentMonth: true,
                      date: new Date(currentYear, currentMonth, i),
                    });
                  }

                  // 3. Add days from the next month to complete the last week, if needed.
                  while (calendarDays.length % 7 !== 0) {
                    const nextDay =
                      calendarDays.length - (daysInMonth + firstDayOfMonth) + 1;
                    calendarDays.push({
                      day: nextDay,
                      isCurrentMonth: false,
                      date: new Date(currentYear, currentMonth + 1, nextDay),
                    });
                  }

                  // Now render the calendar cells.
                  return calendarDays.map((dayObj, index) => {
                    // Mark "today" only if the day belongs to the current month.
                    const isToday =
                      dayObj.isCurrentMonth && dayObj.day === currentDay;
                    // Mark as selected only if it belongs to the current month.
                    const isSelected =
                      dayObj.isCurrentMonth && dayObj.day === selectedDate;

                    return (
                      <div
                        key={index}
                        className={`calendar-day ${
                          isSelected ? "selected" : ""
                        } ${isToday ? "today" : ""} ${
                          !dayObj.isCurrentMonth ? "non-current" : ""
                        }`}
                        onClick={() => {
                          // Only allow selecting days from the current month.
                          if (dayObj.isCurrentMonth) {
                            handleDateClick(dayObj.day);
                          }
                        }}
                        ref={isToday ? todayRef : null} // Reference today's element if needed.
                      >
                        <div className="day-number">{dayObj.day}</div>
                        <div className="day-label">
                          {dayObj.date.toLocaleString("en-US", {
                            weekday: "short",
                          })}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
              <div className="envets_dash_container">
                <div className="table-container">
                  <div className="search-bar">
                    <div>
                      Show
                      <select
                        value={entriesCount}
                        onChange={handleEntriesChange}
                      >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                      </select>
                      entries
                    </div>
                    <div className="search-container2">
                      <i className="search-icon"></i>
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
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
                      {Array.isArray(currentEvents) &&
                      currentEvents.length > 0 ? (
                        currentEvents.map((event, index) => {
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
                                  <span>
                                    {new Date(event.date).toLocaleDateString(
                                      "en-US",
                                      {
                                        month: "short",
                                        day: "2-digit",
                                        year: "numeric",
                                      }
                                    )}
                                  </span>
                                  <span
                                    style={{ fontSize: "12px", color: "#777" }}
                                  >
                                    {new Date(
                                      `1970-01-01T${event.time}`
                                    ).toLocaleTimeString("en-US", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}
                                  </span>
                                </div>
                              </td>
                              <td>
                                {event.appointmentName}
                                <div
                                  style={{ fontSize: "16px", color: "#777" }}
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
                                    style={{
                                      color: "black",
                                      fontSize: "14px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {event.firstName + " " + event.lastName}
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

                  {/* Pagination Controls */}
                  {filteredEvents.length > entriesCount && (
                    <div className="pagination">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        // style={{
                        //   border: "1px solid lightgray",
                        //   alignItems: "center",
                        //   display: "flex",
                        //   borderradius: "5px",
                        //   padding: "5px 12px",
                        //   justifyContent:"center",
                        //   width:"6em"
                        // }}
                      >
                        <IoChevronBack size={15} />
                        Previous
                      </button>
                      <span>{`Page ${currentPage} of ${totalPages}`}</span>
                      <button
                        style={{
                          border: "1px solid lightgray",
                          alignItems: "center",
                          display: "flex",
                          borderradius: "5px",
                          padding: "5px 12px",
                          justifyContent: "center",
                          width: "6em",
                        }}
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                      >
                        Next <IoChevronForwardSharp size={15} />
                      </button>
                    </div>
                  )}
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
                            const [hour, period] = timeStr.split(" ");
                            return { hour: hour.split(":")[0], period };
                          };

                          const eventTimeParts = extractHourAndPeriod(
                            event.time
                          );
                          const slotTimeParts = extractHourAndPeriod(time);

                          // Compare hour and period (AM/PM)
                          const isSameHour =
                            eventTimeParts.hour === slotTimeParts.hour;
                          const isSamePeriod =
                            eventTimeParts.period === slotTimeParts.period;

                          return isSameHour && isSamePeriod;
                        })
                        .map((event, eventIndex) => {
                          const { color, backgroundColor } = getStatusColors(
                            event.status
                          );
                          return (
                            <div
                              style={{
                                color: color,
                                backgroundColor: backgroundColor,
                              }}
                              className="event"
                              key={eventIndex}
                            >
                              <div className="details">
                                <div style={{ width: "19em" }}>
                                  <span>
                                    <strong>{event.appointmentName}</strong>
                                  </span>
                                </div>
                                <div>
                                  {new Date(event.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "long",
                                      day: "2-digit",
                                      year: "numeric",
                                    }
                                  )}
                                </div>
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
