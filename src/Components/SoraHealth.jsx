import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Icons from react-icons
import { FaBell } from 'react-icons/fa';
const accordionData = [
    {
        number: "01",
        title: "Emergency Cost Coverage",
        content: [
            "Health Insurance: Check with your health insurance provider to understand what your plan covers in emergency situations. Most insurance plans include emergency room visits.",
            "Explore government assistance programs for those who qualify.",
            "Consider setting up an emergency fund for unexpected costs."
        ],
        buttons: ["Cardiovascular Disease Testing", "Cardiovascular Disease Risk Reduction Visit"],
        open: false,
    },
    {
        number: "02",
        title: "What factors typically influence the cost of a hospital stay?",
        content: [
            "Length of stay: Longer stays usually cost more.",
            "Type of care: Intensive care units (ICUs) are more expensive.",
            "Insurance coverage: Your out-of-pocket costs depend on your insurance policy."
        ],
        buttons: ["Learn More"],
        open: false,
    },
    {
        number: "03",
        title: "Prescription Drug Costs",
        content: [
            "Drug brand: Generic drugs are typically cheaper than branded ones.",
            "Insurance coverage: Check if your policy covers specific prescriptions.",
            "Discount programs: Many pharmacies offer discount cards for common drugs."
        ],
        buttons: ["View Discounts", "Check Coverage"],
        open: false,
    },
    {
        number: "04",
        title: "High blood pressure appointments",
        content: [
            "Routine check-ups: Regular visits to monitor blood pressure.",
            "Lifestyle recommendations: Guidance on diet and exercise.",
            "Medication adjustments: Ensuring the right dosage for effective management."
        ],
        buttons: ["Find Providers", "Learn Tips"],
        open: false,
    },
    {
        number: "05",
        title: "Mental Health Services Costs",
        content: [
            "Therapy sessions: Costs vary based on provider and session length.",
            "Insurance: Some policies cover mental health services.",
            "Community programs: Free or low-cost options may be available in your area."
        ],
        buttons: ["Find Therapists", "Learn More"],
        open: false,
    },
];

const Sorahealth = () => {
    const [currentDate, setCurrentDate] = useState("");
    useEffect(() => {
        const date = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        setCurrentDate(formattedDate);
    }, []);
    return (
        <div className='inner-c'>
            <div className="right-header">
                <div style={{ width: "40%" }} className="header-left-container">
                    <span className="Title-name">Sora health+</span>
                </div>

                <div className="header-right-container">
                    <div className="header-bar">
                        {/* Search Input */}
                        <div className="search-container">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search Caring"
                            />
                        </div>
                        {/* Left Button */}
                        <button className="create-plan-btn">Search</button>

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
            <div className="accordion">
                {accordionData.map((item, index) => (
                    <details key={index} open={item.open}>
                        <summary>
                            <span className="number">{item.number}</span> <span className="detail-title">{item.title}</span>
                            <span className="expand-icon">+</span>
                        </summary>
                        {item.content && (
                            <div className="content">
                                <ul>
                                    {item.content.map((bullet, bulletIndex) => (
                                        <li key={bulletIndex}>{bullet}</li>
                                    ))}
                                </ul>
                                {item.buttons && (
                                    <div className="buttons">
                                        {item.buttons.map((buttonText, btnIndex) => (
                                            <button key={btnIndex}>{buttonText}</button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </details>
                ))}
            </div>
        </div>
    );
};

export default Sorahealth;

