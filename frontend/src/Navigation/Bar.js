// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import React from "react";

// const Bar = () => {
//   return (
//     <Navbar expand="lg" className="bg-secondary">
//       <Container>
//         <Navbar.Brand href="/" style={{ fontWeight: 'bold' }} className="me-auto">Disaster Response</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="navbar-brand">
//             <Nav.Link href="/">Home</Nav.Link>
//             <Nav.Link href="/alerts">Alerts</Nav.Link>
//             <Nav.Link href="/settings">Settings</Nav.Link>

//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }



import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from "react";

function Bar() {

  // const isLoggedIn = !!sessionStorage.getItem('username');
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
            <Nav.Link className="ms-3" href="/alerts">Alerts</Nav.Link>
            <Nav.Link className="ms-3" href="/settings">Settings</Nav.Link>  
            {/* {isLoggedIn ? (
              <Nav.Link className="ms-3" href="/logout">Logout</Nav.Link>
            ) : (
              <Nav.Link className="ms-3" href="/login">Login</Nav.Link>
            )
            } */}
            
          </Nav>
        </Navbar.Collapse>
      </Container>  
    </Navbar>
  );
}

export default Bar;