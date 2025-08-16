// pages/Dashboard.jsx
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="container-dash">
        <div className="dashboard-header">
          <h1>DINEX</h1>
          <h2>DASHBOARD</h2>
        </div>
        
        <div className="welcome-section">
          <h3>Hello, User!</h3>
          <p>Welcome back, User!</p>
          <p>Here's your reservation summary at DINEX</p>
        </div>
        
        <div className="reservation-card">
          <h3>DINEX Restaurant</h3>
          <div className="reservation-details">
            <div className="detail">
              <span>Date:</span>
              <span>July 12, 2025</span>
            </div>
            <div className="detail">
              <span>Time:</span>
              <span>7:00 PM</span>
            </div>
          </div>
        </div>
        
        <div className="profile-section">
          <h3>Profile Setting</h3>
          <form className="profile-form">
            <div className="form-group">
              <label>Name:</label>
              <input type="text" value="User" readOnly />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" value="user@gmail.com" readOnly />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input type="tel" value="+1234567890" readOnly />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input type="text" value="12/A ABC Street" readOnly />
            </div>
            <button type="button" className="btn">Save Changes</button>
          </form>
        </div>
        
        <button className="logout-btn">Log Out</button>
      </div>
    </div>
  );
};

export default Dashboard;