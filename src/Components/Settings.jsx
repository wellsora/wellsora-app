import React from 'react'
import "../App.css";
import { FaBell } from 'react-icons/fa';

const Settings = () => {
  return (
    <>
        <div className="right-header">
                <div className="header-left-container">
                  <span className="name">Settings</span>
                </div>
                <div className="header-right-container">
                  <div style={{ justifycontent: "flexend",gap: "10px"}} className="header-bar">

                  

                    <div style={{    width: "10%"}} className="notification-icon">
                      <FaBell />
                    </div>
                  </div>
                </div>
        </div>
        <div className="S-container">
       
          <div className="sleft">
  <div className="card-container">
    {/* Profile Card with Image */}
    <div className="profile-card">
      <div className="profile-image">
        <img src="https://pics.craiyon.com/2023-11-26/oMNPpACzTtO5OVERUZwh3Q.webp" alt="User Name" />
      </div>
      <div className="user-info">
        <div className="user-name">User Name</div>
        <div className="user-email">user@email.com</div>
      </div>
    </div>

    {/* Information Card */}
    <div className="info-card">
      <div className="info-details">
        <h3>Information</h3>
        <div className="info-item">
          <strong className='str'>Name:</strong> Gandi
        </div>
        <div className="info-item">
          <strong className='str'>Email:</strong> user@email.com
        </div>
        <div className="info-item">
          <strong className='str'>Tel:</strong> +1 202 456 11 11
        </div>
        <div className="info-item">
          <strong className='str'>Plan:</strong> Hardcoded
        </div>
      </div>
      <div className="preferences">
        <h3>Preferences</h3>
        <div className="preference-item">
          <strong className='str'>Plan:</strong> Hardcoded
        </div>
        <div className="preference-item">
          <strong className='str'>Notifications:</strong> 
           <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
        </div>
      </div>
    </div>
  </div>
</div>

          
          <div className="sRight">
  <div className="change-settings">
    <h2>Change Settings</h2>

    <div className="form-container">
      {/* Account Information */}
      <div className="section">
        <h3>Account Information</h3>
        <div className="input-group">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <div className="tel-group">
            <input type="tel" placeholder="+1" />
            <input type="tel" placeholder="202 456 11 11" />
          </div>
        </div>
      </div>

      {/* Email Section */}
      <div className="section">
        <h3>Email</h3>
        <div className="input-group">
          <input type="email" placeholder="New Email" />
          <input type="password" placeholder="Enter Password" />
          <button className="button">Change Email</button>
        </div>
      </div>

      {/* Password Section */}
      <div className="section">
        <h3>Password</h3>
        <div className="input-group">
          <input type="password" placeholder="New Password" />
          <input type="text" placeholder="Enter code sent on Email" />
          <button className="button">Change Password</button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="section-n">
          <h3>Notifications</h3>
          <div className="notification-toggle">
            <label>Email Notification:</label>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
          <div className="notification-toggle">
            <label>Phone Notification:</label>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
          <div className="notification-toggle">
            <label>Push Notification:</label>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>


      {/* Save Changes Button */}
      <div className="save-changes">
        <button className="button">Save Changes</button>
      </div>

      {/* Forgot Password Link */}
      <div className="forgot-password">
        <a href="#">Forgot your password?</a>
      </div>
    </div>
  </div>
</div>

</div>

    </>
  )
}
export default Settings