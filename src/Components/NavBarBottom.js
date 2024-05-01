import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './NavBar.css'; // Update the path to your CSS file
import logo from "../Images/logo-2.png"; 


function NavBarBottom() {
  return (
    <div >
      <Container fluid>
        <Nav className="flex-column justify-content-end"> {/* Modified Nav for vertical alignment */}
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
    </div>
  );
}

export default NavBarBottom;
