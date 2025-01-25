import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import "../App.css";
import { HiDotsVertical } from "react-icons/hi";

const policyText = `
Privacy Policy:

We are committed to protecting your privacy. This privacy policy outlines how we collect, use, and safeguard your personal information. By using our services, you agree to the collection and use of information in accordance with this policy.

Information Collection:
We collect various types of information for different purposes to provide and improve our services to you.

Data Usage:
The collected data is used to personalize your experience, improve our website, and provide customer support.

Data Sharing:
We do not share your personal information with third parties without your consent, except as required by law.

Security:
We employ security measures to ensure the safety of your personal information.

Changes to the Policy:
We may update our privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
`;

const Privacy = () => {
  const [isColored, setIsColored] = useState(false);

  // Inline styles
  const defaultStyle = {
    backgroundColor: "#f0f0f0",
    width: "20px",
    height: "20px",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    marginRight: "10px", // Space between checkbox and text
  };
  const defaultStyle2 = {
    backgroundColor: "#f0f0f0",
    width: "20px",
    height: "20px",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    marginRight: "10px", // Space between checkbox and text
  };

  const coloredStyle = {
    ...defaultStyle,
    backgroundColor: "#007b9e",
    color: "white",
  };

  const handleClick = () => {
    setIsColored((prev) => !prev);
  };
  const containerStyle = {
    padding: "20px",
    borderRadius: "8px",
    color: "white", // Text color white for readability on the blue background
  };

  const headingStyle = {
    color: "#007b9e", // Set heading color to blue
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px", // Spacing below headings
  };

  const sectionHeadingStyle = {
    color: "#007b9e", // Blue for section headings
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "15px", // Space before each section heading
    marginBottom: "15px", // Space after each section heading
  };

  const policyContainerStyle = {
    maxHeight: "30em", // Set maximum height for scrollable content
    overflowY: "auto", // Enable vertical scrolling
    marginTop: "10px",

    padding: "2% ",
    borderRadius: "4px",
    color: "#333", // Darker text color for readability
  };

  return (
    <>
      <div style={{ gap: "38em" }} className="right-header">
        <div style={{ width: "26%" }} className="header-left-container">
          <span style={{ fontWeight: "800" }} className="name">
            Privacy Policy
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            gap: "20px",
            width: "15%",
          }}
          className="header-right-container"
        >
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
            <HiDotsVertical style={50} />
          </div>
        </div>
      </div>
      <div className="right-content" style={containerStyle}>
        <div style={policyContainerStyle}>
          <h3 style={sectionHeadingStyle}>Introduction</h3>
          <p style={{ width: "60em", textAlign: "justify" }}>{policyText}</p>

          <h3 style={sectionHeadingStyle}>Information Collection</h3>
          <p>
            We collect various types of information for different purposes to
            provide and improve our services to you.
          </p>

          <h3 style={sectionHeadingStyle}>Data Usage</h3>
          <p>
            The collected data is used to personalize your experience, improve
            our website, and provide customer support.
          </p>

          <h3 style={sectionHeadingStyle}>Data Sharing</h3>
          <p>
            We do not share your personal information with third parties without
            your consent, except as required by law.
          </p>

          <h3 style={sectionHeadingStyle}>Security</h3>
          <p>
            We employ security measures to ensure the safety of your personal
            information.
          </p>

          <h3 style={sectionHeadingStyle}>Changes to the Policy</h3>
          <p>
            We may update our privacy policy from time to time. We will notify
            you of any changes by posting the new policy on this page.
          </p>
        </div>
      </div>
      <div
        className="check-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          position: "absolute",
          bottom: 0,
          padding: "20px",
          paddingLeft: "46px",
        }}
      >
        {/* Checkbox and Label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingleft: " 20px ",
          }}
        >
          <div
            style={isColored ? coloredStyle : defaultStyle}
            onClick={handleClick}
          >
            {isColored && "✔"}
          </div>
          <span>
            I confirm that I have read and accept the terms and conditions and
            privacy policy.
          </span>
        </div>

        {/* Buttons */}
      </div>
    </>
  );
};

export default Privacy;
