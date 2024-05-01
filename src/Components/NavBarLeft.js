// NavBarLeft.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './NavBar.css';
import logo from "../Images/logo-2.png"; 

const logoStyle = {
  marginRight: "10px", // Adjust margin as needed
  width: "auto",
  maxWidth: "100px", // Adjust the width of the logo
  height: "auto" // Maintain aspect ratio
};

function NavBarLeft() {
  return (
    <div className="position-fixed top-0 start-0">
      <Navbar className="shadow-sm" style={{ backgroundColor: '#02599c', minHeight: '100vh' }}>
        <Container fluid>
          <Nav className="flex-column">
            <a className="flex-column">
              <img src={logo} alt="Logo" style={logoStyle} /> {/* Add logo */}
            </a>
            <br/>
            <Nav.Link as={Link} to="/" style={{ fontSize: '20px' }}>
              <i className="fa fa-home"></i> <span className="menu-text">Home</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/all" style={{ fontSize: '20px' }}>
              <i className="fa fa-list"></i> <span className="menu-text">All Posts</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/maps" style={{ fontSize: '20px' }}>
              <i className="fa fa-map"></i> <span className="menu-text">Maps</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/register" style={{ fontSize: '20px' }}>
              <i className="fa fa-user-plus"></i> <span className="menu-text">Register</span>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBarLeft;
