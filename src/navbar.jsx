import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './navbar.css'; // Import your CSS

const Navbar = () => {
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleHomeDropdown = () => {
    setHomeDropdownOpen(!homeDropdownOpen);
  };
  

  return (
    <div className="all">
      <nav className="navbar">
        <ul className="nav-list">
          {/* Home with Dropdown */}
          <li
            className="nav-item nav-dropdown"
            onMouseEnter={toggleHomeDropdown}
            onMouseLeave={toggleHomeDropdown}
          >
            <span className="nav-link">
              <a onClick={() => navigate("/home")}>Home</a>
            </span>
            {homeDropdownOpen && (
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <a
                    onClick={() => navigate("/Salty-Spicy")}
                    className="dropdown-link"
                  >
                    Salty/Spicy
                  </a>
                </li>
                <li className="dropdown-item">
                  <a
                    onClick={() => navigate("/sweet")}
                    className="dropdown-link"
                  >
                    Sweet
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Profile Link */}
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>

          {/* Add New Recipe Link */}
          <li className="nav-item">
            <Link to="/add-recipe" className="nav-link">
              Add New Recipe
            </Link>
          </li>
        </ul>

        {/* Logo */}
        <div className="logo-container">
          <a
            href="/auth"
            onClick={() => {
            localStorage.removeItem("userId"); // Properly remove the userId from localStorage
            console.log("Logged out! User ID:", localStorage.getItem("userId")); // Log the current state of userId
            }}
          >
            Log Out
          </a>

          <img
            src="/pictures/logo.png"
            alt="Logo"
            className="logo"
            onClick={() => navigate("/home")} // Optional: Clickable logo
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
