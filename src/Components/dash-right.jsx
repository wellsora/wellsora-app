import React, { useEffect, useState } from 'react';
import logoimage from "../assets/logoimage.svg";
import { FaRegCalendarAlt, FaHandHoldingHeart, FaSearch, FaCog, FaLock } from 'react-icons/fa'; // Icons from react-icons
import { BsHeartPulseFill } from 'react-icons/bs'; // Another icon from react-icons
import { IoIosStats } from 'react-icons/io'; // Stats icon from react-icons
import { TbLogout2 } from "react-icons/tb";
import { FaBell } from 'react-icons/fa';
import { FaGoogle, FaApple, FaMicrosoft } from 'react-icons/fa';
import { FaEllipsisV } from "react-icons/fa";
import Modal from './Modal';

const events = [
    {
        date: "December 26, 2025",
        activity: "Visit Dr. Joe for Eye Checkup",
        address: "2344 Lawman Avenue, Fairfax",
        service: "Transport",
        caring: "John Doe",
    },
    {
        date: "December 31, 2025",
        activity: "Visit Dr. Joe for Eye Checkup",
        address: "3400 Spruce Street, PA 19106",
        service: "Support",
        caring: "John Doe",
    },
    {
        date: "January 02, 2026",
        activity: "Visit Dr. Joe for Eye Checkup",
        address: "Address",
        service: "Post Visit",
        caring: "John Doe",
    },
    {
        date: "January 20, 2026",
        activity: "Visit Dr. Joe for Eye Checkup",
        address: "Address",
        service: "Physical Assistance",
        caring: "John Doe",
    },
    {
        date: "March 20, 2026",
        activity: "Visit Dr. Joe for Eye Checkup",
        address: "Address",
        service: "Health Monitor",
        caring: "John Doe",
    },
];
const Dashboard_left = () => {
    const [currentDate, setCurrentDate] = useState("");
    const [selectedDate, setSelectedDate] = useState(7); // Default selected date
    const [isModalVisible, setModalVisible] = useState(false);
    const daysInMonth = 30; // Number of days to display

    const handleCreateClick = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleDateClick = (day) => {
        setSelectedDate(day);
    };
 const timeSlots = Array.from({ length: 24 }, (_, index) => {
    const hour = index % 12 || 12;
    const period = index < 12 ? 'AM' : 'PM';
    return `${hour}:00 ${period}`;
});

    useEffect(() => {
        const date = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        setCurrentDate(formattedDate);
    }, []);

    return (
        <>
        <div className="right-header">
                    <div className="header-left-container">
                        <span className="name">Welcome back, Gandi</span>
                        <span className="date">{currentDate}</span>
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
                                    placeholder="Search Caring"
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
                                />
                                <div className="profile-info">
                                    <span className="profile-name">First Name</span>
                                    <span className="profile-link">View Profile</span>
                                </div>
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
                                    return (
                                        <div
                                            key={day}
                                            className={`calendar-day ${isSelected ? "selected" : ""}`}
                                            onClick={() => handleDateClick(day)}
                                        >
                                            <div className="day-number">{day}</div>
                                            <div className="day-label">
                                                {new Date(2024, 11, day).toLocaleString("en-US", {
                                                    weekday: "short",
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="envets_dash_container">

                                <div className="upcomming-heading">
                                    <span className="upcoming-heading">
                                        Upcoming events
                                    </span>
                                </div>
                                <div className="table-container">
                                    <div className="search-bar">
                                        <div>
                                            Show
                                            <select>
                                                <option value="10">10</option>
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
                                                <th>Scheduled Date</th>
                                                <th>Activity</th>
                                                <th>Services</th>
                                                <th>Caring</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {events.map((event, index) => (
                                                <tr key={index}>
                                                    <td>{event.date}</td>
                                                    <td>
                                                        {event.activity}
                                                        <div style={{ fontSize: "12px", color: "#777" }}>
                                                            {event.address}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <select className="services-dropdown" defaultValue={event.service}>
                                                            <option value="Transport">Transport</option>
                                                            <option value="Support">Support</option>
                                                            <option value="Post Visit">Post Visit</option>
                                                            <option value="Physical Assistance">Physical Assistance</option>
                                                            <option value="Health Monitor">Health Monitor</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <button className="caring-btn">{event.caring}</button>
                                                    </td>
                                                    <td>
                                                        <FaEllipsisV />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-dash-right">
                    <div className="timeline-container">
    <div className="timeline">
        {timeSlots.map((time, index) => (
            <div className="time-slot" key={index}>
                {time}
                {time === '11:00 AM' && (
                    <div className="event orange">
                        <div className="details">
                            <strong>Monthly Physical Exam</strong>
                            <div>January 4, 2022</div>
                        </div>
                        <div className="icons">
                            <FaGoogle size={20} style={{ marginRight: '5px', cursor: 'pointer' }} />
                            <FaMicrosoft size={20} style={{ marginRight: '5px', cursor: 'pointer' }} />
                            <FaApple size={20} style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                )}
                {time === '3:00 PM' && (
                    <div className="event blue">
                        <div className="details">
                            <strong>Checkup By Eye Specialist</strong>
                            <div>January 4, 2022</div>
                        </div>
                        <div className="icons">
                            <FaGoogle size={20} style={{ marginRight: '5px', cursor: 'pointer' }} />
                            <FaMicrosoft size={20} style={{ marginRight: '5px', cursor: 'pointer' }} />
                            <FaApple size={20} style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                )}
            </div>
        ))}
    </div>
</div>
                    </div>
                </div>
                <Modal isVisible={isModalVisible} onClose={handleCloseModal} />
                </>
    )
}

export default Dashboard_left;