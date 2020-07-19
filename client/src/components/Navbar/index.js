import React from "react";
import "./style.css";
import { Navbar } from 'react-bootstrap'
import basketball from '../../images/icons8-basketball-48.png'

function Nav() {

  return (
    <>
      <Navbar bg="navStyle" className="navStyle shadow p-3 mb-5" variant="dark">
        <Navbar.Brand>
          BASKETBALL STATS 
          <img src={basketball} alt="basketball"/>
        </Navbar.Brand>
      </Navbar>
    </>

      
  );
}

export default Nav;