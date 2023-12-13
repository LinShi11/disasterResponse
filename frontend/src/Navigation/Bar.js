import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from "react";
import { useNavigate } from 'react-router-dom';

function Bar() {
  const navigate = useNavigate();
  const userType = sessionStorage.getItem('userType');

  const handleLogout = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userType');
    navigate('/login');
  };
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary bg-dark font-weight-bold font-weight: bold navbar-dark navbar-brand">
      <Container>
        <Navbar.Brand href="/home">Disaster Response</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav className="navbar-brand me-3">
            <Nav.Link href="/home">Home</Nav.Link>
            {userType === 'authority' && (
              <>
                <Nav.Link className="ms-3" href="/alerts">Alerts</Nav.Link>
                <Nav.Link className="ms-3" href="/sendAlert">Send Alerts</Nav.Link>
                <Nav.Link className="ms-3" href="/sendTasks">Send Tasks</Nav.Link>
              </>
            )}
            {userType === 'regular' && (
              <>
                <Nav.Link className="ms-3" href="/alerts">Alerts</Nav.Link>
                <Nav.Link className="ms-3" href="/settings">Settings</Nav.Link>
              </>
            )} 
            {userType === 'rescue team' && (
              <>
                <Nav.Link className="ms-3" href="/alerts">Alerts</Nav.Link>
              </>
            )} 
          </Nav>
        </Navbar.Collapse>
      </Container>  
    </Navbar>
  );
}

export default Bar;