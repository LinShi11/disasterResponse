import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from "react";

const Bar = () => {
  return (
    <Navbar expand="lg" className="bg-secondary">
      <Container>
        <Navbar.Brand href="/" style={{ fontWeight: 'bold' }} className="me-auto">Disaster Response</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-brand">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/alerts">Alerts</Nav.Link>
            <Nav.Link href="/settings">Settings</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Bar;