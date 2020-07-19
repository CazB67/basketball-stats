import React from "react";
import "./style.css";
import { Navbar } from 'react-bootstrap'
import logo from '../../images/logo.PNG'

function Nav() {

  return (
    <>
      <Navbar bg="navStyle" className="navStyle shadow mb-5" variant="dark">
        <Navbar.Brand>
        <img
        src={logo}
        
        className="d-inline-block align-top pr-5"
        alt="React Bootstrap logo"
      />
        </Navbar.Brand>
      </Navbar>
    </>

      
  );
}

export default Nav;