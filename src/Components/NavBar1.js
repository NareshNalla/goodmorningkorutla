import React, { useState, useEffect } from "react";
import SocialLinks from "./SocialLinks";
import logo from "../Images/logo-2.png"; // Adjust the path to your logo image

function NavBar1() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Function to handle scroll event
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > 0);
  };

  // Add scroll event listener when component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Define dynamic styles for the navbar
  const navStyle = {
    backgroundColor: isScrolled ? "white" : "white", // Light pink background color when scrolled
    boxShadow: isScrolled ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none", // Add shadow when scrolled
    transition: "background-color 0.3s, box-shadow 0.3s", // Smooth transition effect
    position: isScrolled ? "fixed" : "static", // Make navbar fixed on scroll
    top: 0, // Position navbar at the top of the viewport
    left: 0, // Position navbar at the left of the viewport
    width: "100%", // Make navbar span the entire width
    zIndex: 10, // Ensure navbar stays on top of other elements
  };
// backgroundColor: isScrolled ? "#FFC0CB" : "transparent",
  const logoStyle = {
    marginRight: "10px", // Adjust margin as needed
    width: "40px", // Adjust the width of the logo
    height: "auto", // Maintain aspect ratio
  };

  // Content container will handle its own padding

  return (
    <>
      <nav className="navbar" style={navStyle}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Logo" style={logoStyle} /> {/* Add logo */}
            Good Morning Korutla
          </a>
          <div className="social-links">
            <SocialLinks />
          </div>
        </div>
      </nav>
      {/* Your content here, no padding needed */}
    </>
  );
}

export default NavBar1;