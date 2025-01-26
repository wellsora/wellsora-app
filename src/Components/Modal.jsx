import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Install 'uuid' package using `npm install uuid`
import LocationInput from "./PlaceAutocomplete/LocationInput"; // Ensure this is a valid component

const Modal = ({ isVisible, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    appointmentName: "",
    status: "New",
    location: "",
    date: "",
    time: "",
    service: "Transport", // Default value for services dropdown
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStatusClick = (status) => {
    setFormData((prevData) => ({
      ...prevData,
      status,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault(); // Prevent form submission

    const uniqueId = uuidv4(); // Generate a unique ID
    const savedData = { id: uniqueId, ...formData };

    // Retrieve existing data from local storage or initialize an empty array
    const existingData = JSON.parse(localStorage.getItem("formEntries")) || [];

    // Save the new data with the unique ID
    localStorage.setItem(
      "formEntries",
      JSON.stringify([...existingData, savedData])
    );

    onClose(); // Close the modal after saving the data
  };

  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <form className="modal-form" onSubmit={handleSave}>
          <div className="name-container">
            <div className="name-input">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="name-input">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                required
                onChange={handleInputChange}
              />
            </div>
          </div>

          <input
            type="text"
            required
            name="appointmentName"
            placeholder="Appointment Name"
            value={formData.appointmentName}
            onChange={handleInputChange}
          />

          <label>Status</label>
          <div className="status-buttons">
            <button
              type="button"
              className={`btn ${formData.status === "New" ? "active" : ""}`}
              onClick={() => handleStatusClick("New")}
            >
              New
            </button>
            <button
              type="button"
              className={`btn ${formData.status === "In Progress" ? "active" : ""}`}
              onClick={() => handleStatusClick("In Progress")}
            >
              In Progress
            </button>
            <button
              type="button"
              className={`btn ${formData.status === "Resolved" ? "active" : ""}`}
              onClick={() => handleStatusClick("Resolved")}
            >
              Resolved
            </button>
          </div>

          {/* LocationInput component */}
          <LocationInput formData={formData} setFormData={setFormData} />

          <div className="datetime-section">
            <label>Date and Time</label>
            <div className="datetime-container">
              <input
                required
                type="date"
                name="date"
                className="date-input"
                value={formData.date}
                onChange={handleInputChange}
              />
              <input
                type="time"
                name="time"
                required
                className="time-input"
                value={formData.time}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <select
            name="service"
            required
            className="services"
            value={formData.service}
            onChange={handleInputChange}
          >
            <option value="Transport">Transport</option>
            <option value="Support">Support</option>
            <option value="Post Visit">Post Visit</option>
            <option value="Physical Assistance">Physical Assistance</option>
            <option value="Health Monitor">Health Monitor</option>
          </select>

          <div className="modal-actions">
            <button className="btn-bottom" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="btn-bottom" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
