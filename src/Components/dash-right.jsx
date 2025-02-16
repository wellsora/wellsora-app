import React, { useEffect, useState, useRef } from "react";
import {FaSearch} from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
import { FaGoogle, FaApple, FaMicrosoft } from 'react-icons/fa';
import Modal from './Modal';
import { HiDotsVertical } from "react-icons/hi";
import { GoDotFill } from "react-icons/go";
import { LuNotebookText } from "react-icons/lu";


const events = [
    {
        date: "December 26, 2024",
        time: "11:00 AM",
        activity: "Visit Dr. Joe for Eye Checkup",
        address: "2344 Lawman Avenue, Fairfax",
        service: "Transport",
        caring: "John Doe",
         bgcolor:"#33FF521A",
         color: "#009B01B0"
    },
    {
        date: "December 31, 2024",
        time: "11:00 AM",
        activity: "Visit Dr. Joe for Eye Checkup",
        address: "3400 Spruce Street, PA 19106",
        service: "Support",
        caring: "John Doe",
         bgcolor:"#33FF521A",
         color: "#009B01B0"
    },
    {
        date: "January 02, 2025",
        time: "11:00 AM",
        activity: "Visit Dr. Joe for Eye Checkup",
        address: "Address",
        service: "Post Visit",
        caring: "John Doe",
        bgcolor:"#FFCF331A",
        color: "#FFCF33"
    },
    {
        date: "January 20, 2026",
        time: "11:00 AM",
        activity: "Visit Dr. Joe for Eye Checkup",
        address: "Address",
        service: "Physical Assistance",
        caring: "John Doe",
           bgcolor:"#FFCF331A",
        color: "#FFCF33"
      

    },
    {
        date: "March 20, 2026",
        time: "11:00 AM",
        activity: "Visit Dr. Joe for Eye Checkup",
        address: "Address",
        service: "Health Monitor",
        caring: "John Doe",
        bgcolor : "#FB54571A",
        color: "#FF0005"
    },
];
const Dashboard_left = () => {

    const [currentDate, setCurrentDate] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().getDate());
    const todayRef = useRef(null);
    const [eventlist, setEventlist] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [todaysEvents, setTodaysEvents] = useState([])
    // Date configuration
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Load data from localStorage
    useEffect(() => {
        const loadData = () => {
            const storedData = localStorage.getItem("formEntries");
            if (storedData) {
                try {
                    const parsedData = JSON.parse(storedData);
                    const formattedData = parsedData.map(event => ({
                        ...event,
                        fullName: event.fullName || `${event.firstName || ''} ${event.lastName || ''}`.trim(),
                        date: new Date(event.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        }),
                        color: getStatusColor(event.status).color,
                        bgcolor: getStatusColor(event.status).bg
                    }));
                    setEventlist(formattedData);
                } catch (error) {
                    console.error('Error loading data:', error);
                }
            }
        };

        const getStatusColor = (status) => {
            switch(status) {
                case 'New': return { bg: '#FFCF331A', color: '#FFCF33' };
                case 'In Progress': return { bg: '#33FF521A', color: '#009B01B0' };
                default: return { bg: '#FB54571A', color: '#FF0005' };
            }
        };

        const dateOptions = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
        setCurrentDate(new Date().toLocaleDateString("en-US", dateOptions));
        loadData();

        if (todayRef.current) {
            todayRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center"
            });
        }
    }, []);

  const [selectedOptions, setSelectedOptions] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
  });

  const handleloaddata =()=>{
    const temp =localStorage.getItem("formEntries")
    setEventlist(temp);
    
  } 

  // Handler to set selected option for each question, ensuring only one option is selected
  const handleOptionSelect = (question, option) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [question]: option, // Only update the selected option for that question
    }));
  };

  // Generate time slots for the timeline
  const timeSlots = Array.from({ length: 24 }, (_, index) => {
    const hour = index % 12 || 12;
    const period = index < 12 ? "AM" : "PM";
    return `${hour}:00 ${period}`;
  });
 
  

  useEffect(() => {
    const date = new Date();
    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    setCurrentDate(date.toLocaleDateString("en-US", options));
  }, []);

  useEffect(() => {
    const loadData = () => {
        const storedData = localStorage.getItem("formEntries");
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                const formattedData = parsedData.map(event => ({
                    ...event,
                    fullName: event.fullName || `${event.firstName || ''} ${event.lastName || ''}`.trim(),
                    date: new Date(event.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    }),
                    color: getStatusColor(event.status).color,
                    bgcolor: getStatusColor(event.status).bg
                }));
                setEventlist(formattedData);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'New': return { bg: '#FFCF331A', color: '#FFCF33' };
            case 'In Progress': return { bg: '#33FF521A', color: '#009B01B0' };
            default: return { bg: '#FB54571A', color: '#FF0005' };
        }
    };

    const dateOptions = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    setCurrentDate(new Date().toLocaleDateString("en-US", dateOptions));
    
    // Load data initially
    loadData();

    if (todayRef.current) {
        todayRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
        });
    }
}, []);

useEffect(() => {
    // Fetch events from localStorage
    const storedEvents = JSON.parse(localStorage.getItem("formEntries") || "[]");

    // Filter events for today
    const filteredEvents = storedEvents.filter(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0); // Normalize event date to midnight
      return eventDate.getTime() === today.getTime(); // Compare the date only
    });

    // Set today's events in state
    setTodaysEvents(filteredEvents);

    // Log today's events for debugging
    console.log('Filtered Events for Today:', filteredEvents);
  }, []);
const handleCloseModal = () => {
    setModalVisible(false);
    // Manually trigger data reload after modal closes
    const storedData = localStorage.getItem("formEntries");
    if (storedData) {
        const parsedData = JSON.parse(storedData);
        setEventlist(parsedData.map(event => ({
            ...event,
            // Include all your formatting logic here
        })));
    }
};

  const handleDateClick = (day) => setSelectedDate(day);
  const handleCreateClick = () => setModalVisible(true);

  const getStatus = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    if (event < today) return "Done";
    if (event.toDateString() === today.toDateString()) return "In Progress";
    return "New";
  };

    return (
        <>
        <div className="right-header">
                    <div className="header-left-container">
                        <span className="name">Welcome, Bernie</span>
                        
                    </div>
                    <div className="header-right-container">
                        <div className="header-bar">
                            {/* Left Button */}
                            <button onClick={handleCreateClick} className="create-plan-btn">Create New Plan</button>

                            {/* Search Input */}
                            <div className="search-container">
                                <FaSearch className="search-icon" />
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="search activity"
                                />
                            </div>

                            {/* Notification Icon */}
                            <div className="notification-icon">
                                <FaBell />
                            </div>


                            {/* Profile Section */}
                            <div className="profile-container">
                                <img
                                    src="https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197908.png"
                                    alt="User Profile"
                                    className="profile-picture"
                                /><HiDotsVertical style={50} />
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
                  className={`calendar-day ${isSelected ? "selected" : ""} ${
                    isToday ? "today" : ""
                  }`}
                  onClick={() => handleDateClick(day)}
                  ref={isToday ? todayRef : null} // Reference the element for today's date
                >
                  <div className="day-number">{day}</div>
                  <div className="day-label">
                    {new Date(currentYear, currentMonth, day).toLocaleString(
                      "en-US",
                      { weekday: "short" }
                    )}
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
                        {eventlist.length > 0 ? (
                            eventlist.map((event, index) => (
                                <tr key={index}>
                                    <td>
                                        <div style={{ display: "flex", flexDirection: "column" }} className="sch">
                                            <span>{event.date}</span>
                                            <span style={{ fontSize: "12px", color: "#777" }}>
                                                {event.time}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        {event.appointmentName}
                                        <div style={{ fontSize: "12px", color: "#777" }}>
                                            {event.location}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="services-dropdown">{event.service}</div>
                                    </td>
                                    <td>
                                        <button style={{
                                            border: "none",
                                            color: event.color,
                                            backgroundColor: event.bgcolor,
                                            padding: "5px 10px",
                                            cursor: "pointer",
                                        }} className="caring-btn">
                                            <GoDotFill style={{
                                                position: "relative",
                                                bottom: "-3px",
                                                left: "-2px",
                                                fontSize: "medium",
                                            }} />
                                            <span style={{ color: "black", fontSize: "12px" }}>
                                                {event.fullName}
                                            </span>
                                        </button>
                                    </td>
                                    <td>
                                        <HiDotsVertical style={{ fontSize: "1.5rem" }} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
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
            {todaysEvents.filter(event => event.time === time).map((event, eventIndex) => (
              <div className="event" key={eventIndex}>
                <div className="details">
                  <strong>{event.activity}</strong>
                  <div>{event.date}</div>
                  <div>{event.address}</div>
                </div>
                <div className="icons">
                  <FaGoogle size={15} style={{ marginRight: '5px', cursor: 'pointer' }} />
                  <FaMicrosoft size={15} style={{ marginRight: '5px', cursor: 'pointer' }} />
                  <FaApple size={15} style={{ cursor: 'pointer' }} />
                </div>
              </div>
            ))}
          </div>
        );
      })}
                    </div>






</div>
                    </div>
                </div>
                <Modal isVisible={isModalVisible} onClose={handleCloseModal} />
                </>
    )
}

export default Dashboard_left;