import React from 'react';
import { useState } from 'react';

const Modal = ({ isVisible, onClose }) => {
    const [activeStatus, setActiveStatus] = useState('In Progress');
    const [activeButton, setActiveButton] = useState('Save');

    if (!isVisible) return null;

    const handleStatusClick = (status) => {
        setActiveStatus(status);
    };
    const handleClick = (btnType) => {
        setActiveButton(btnType);
        if (btnType === 'cancel') {
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
            
                <form className='modal-form'>
                    <input className='model-input' type="text" placeholder="Full name" />

                    <input type="text" placeholder="Appointment name" />

                    <label>Status</label>
                    <div className="status-buttons">
                        <button
                            type="button"
                            className={`btn ${activeStatus === 'In Progress' ? 'active' : ''}`}
                            onClick={() => handleStatusClick('In Progress')}
                        >
                            In Progress
                        </button>
                        <button
                            type="button"
                            className={`btn ${activeStatus === 'New' ? 'active' : ''}`}
                            onClick={() => handleStatusClick('New')}
                        >
                            New
                        </button>
                        <button
                            type="button"
                            className={`btn ${activeStatus === 'Resolved' ? 'active' : ''}`}
                            onClick={() => handleStatusClick('Resolved')}
                        >
                            Resolved
                        </button>
                    </div>
                    <input type="text" placeholder="Location" />

                    <div className="datetime-section">
                        <label>Date and Time</label>
                        <div className="datetime-container">
                            <input type="date" className="date-input" />
                            <input type="time" className="time-input" />
                        </div>
                    </div>


                    <div className="modal-actions">
            <button
                className={`btn-bottom ${activeButton === 'cancel' ? 'active' : ''}`}
                type="button"
                onClick={() => handleClick('cancel')}
            >
                Cancel
            </button>
            <button
                className={`btn-bottom ${activeButton === 'save' ? 'active' : ''}`}
                type="submit"
                onClick={() => handleClick('save')}
            >
                Save
            </button>
        </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;
