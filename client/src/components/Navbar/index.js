import React from "react";
import "./style.css";
import { Navbar, Nav } from 'react-bootstrap'
import logo from '../../images/logo.PNG'

function StatsNav() {

  return (
    <>
      <Navbar bg="navStyle" expand="lg" className="navStyle shadow mb-3" variant="dark">
        <Navbar.Brand>
        <img
        src={logo}
        alt="Basketball Stats Logo"
      />
      </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse  className="justify-content-end">
          
            <Nav className={
                window.location.pathname === "/" || window.location.pathname === "/Login" || window.location.pathname === "/Signup"
                ? "d-none"
                : ""}>
              
              <Nav.Link href={"/stats"}>Game</Nav.Link>
              <Nav.Link href={"/display"}>View</Nav.Link>
              <Nav.Link href={"/"}>Logout</Nav.Link> 
              </Nav>
          </Navbar.Collapse>
    

  
    
      </Navbar>
    </>

      
  );
}

export default StatsNav;