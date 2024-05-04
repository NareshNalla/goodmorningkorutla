import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './NavBar.css';

function NavBar2() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    closeMenu();
  }, []);

  return (
    <Navbar expand="lg" className="shadow-sm" style={{ backgroundColor: '#02599c' }}>
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarNav" onClick={toggleMenu} className={isOpen ? "collapsed-white" : ""} />
        <Navbar.Collapse in={isOpen} id="navbarNav" className="justify-content-end">
          <Nav className="me-auto" style={{ paddingLeft: '15px' }}>
            <Nav.Link as={Link} to="/" onClick={closeMenu}>Home</Nav.Link>
            <Nav.Link as={Link} to="/all" onClick={closeMenu}>All Posts</Nav.Link>
            <Nav.Link as={Link} to="/maps" onClick={closeMenu}>Maps</Nav.Link>
            <Nav.Link as={Link} to="/register" onClick={closeMenu}>Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar2;
