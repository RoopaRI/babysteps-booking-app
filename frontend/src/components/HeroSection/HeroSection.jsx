import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HeroSection.css"; // Import the CSS file

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-text">
        <h1>Book an Appointment with Top Doctors</h1>
        <p>Find the best specialists for your healthcare needs.</p>
      </div>
    </div>
  );
};

export default HeroSection;
