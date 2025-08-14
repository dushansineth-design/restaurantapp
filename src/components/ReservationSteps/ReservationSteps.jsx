// components/ReservationSteps.jsx
import { Link } from 'react-router-dom';
import './ReservationSteps.css';

const ReservationSteps = () => {
  return (
    <section className="reservation-steps section-padding">
      <div className="container">
        <h2 className="section-title">Book Your Table in 3 Easy Steps</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Choose Date & Time</h3>
            <p>Select your preferred date and time for your reservation.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Select Guests</h3>
            <p>Tell us how many people will be joining.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Confirm Reservation</h3>
            <p>Complete your booking with just one click.</p>
          </div>
        </div>
        <div className="text-center">
          <Link to="/dashboard" className="btn">Reserve Now</Link>
        </div>
      </div>
    </section>
  );
};

export default ReservationSteps;