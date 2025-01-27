import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Install 'uuid' package using `npm install uuid`
import LocationInput from "./PlaceAutocomplete/LocationInput";


const Modal = ({ eventList, setEventList, isVisible, onClose, editingEvent }) => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    appointmentName: "",
    status: "New",
    location: "",
    date: "",
    time: "",
    service: "Transport",
  })

  // Pre-fill form data when editing
  useEffect(() => {
    if (editingEvent) {
      setFormData({
        firstName: editingEvent.firstName || "",
        lastName: editingEvent.lastName || "",
        appointmentName: editingEvent.appointmentName || "",
        status: editingEvent.status || "New",
        location: editingEvent.location || "",
        date: editingEvent.date || "",
        time: editingEvent.time || "",
        service: editingEvent.service || "Transport",
      })
    } else {
      // Reset form when creating new event or when modal is closed
      setFormData({
        firstName: "",
        lastName: "",  
        appointmentName: "",
        status: "New",
        location: "",
        date: "",
        time: "",
        service: "Transport",
      })
    }
  }, [editingEvent, isVisible])

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
    e.preventDefault()

    let updatedEventList
    const existingData = JSON.parse(localStorage.getItem("formEntries")) || []

    if (editingEvent) {
      // Update existing event
      const updatedData = {
        ...formData,
        id: editingEvent.id, // Preserve the original ID
      }

      updatedEventList = existingData.map((event) => (event.id === editingEvent.id ? updatedData : event))
    } else {
      // Create new event
      const newData = {
        ...formData,
        id: uuidv4(), // Generate new ID only for new events
      }
      updatedEventList = [...existingData, newData]
    }

    // Update localStorage and state
    localStorage.setItem("formEntries", JSON.stringify(updatedEventList))
    setEventList(updatedEventList)
    onClose()
  }

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
