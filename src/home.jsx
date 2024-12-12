import React from "react";
import Navbar from "./navbar";

const Home = () => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <Navbar />
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'fixed', // Ensures the video is fixed and doesn’t move
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover', // Ensures the video fills the screen without distortion
          zIndex: -1,
        }}
      >
        <source src="/pictures/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, paddingTop: '290px' , paddingLeft:'20px'}}>
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            color: 'dark blue',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
          }}
        >
          Welcome to Recipe Manager
        </h1>
        <p
          style={{
            textAlign: 'left',
            color: 'dark blue',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
          }}
        >
          Explore recipes and view profiles.
        </p>
      </div>
    </div>
  );
};

export default Home;
