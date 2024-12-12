import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./startpage.css";
import { FaUserCircle } from 'react-icons/fa';

const Start = () => {
  const navigate = useNavigate();
  

  const handleAuthClick = () => {
    navigate('/auth');
  };

  return (
    <div
      className="all"
      style={{
        backgroundImage: `url(/pictures/home.jpg)`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw', // Full width of the viewport
        overflow: 'hidden', // Prevent scrolling
        margin: '0', // Remove default margins
        padding: '0', // Remove default padding
        display: 'flex', // Optional: For centering children
        justifyContent: 'center', // Optional: Center horizontally
        alignItems: 'center', // Optional: Center vertically
      }}
    >
      <div className="home-container">
        {/* Icon in the top-right corner */}
        <div className="top-right-icon" onClick={handleAuthClick}>
          <FaUserCircle size={40} color="#4CAF50" />
        </div>
        <div className="home-content">
          <img src="/pictures/logo.png" alt="Logo" className="home-logo" />
          <h1 className="home-title">Eat good and make your health well</h1>
          <p className="home-description">
            If you are looking for tasty recipes,{' '}
            <span className="join-link" onClick={handleAuthClick}>
              join us
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
  
};

export default Start;
