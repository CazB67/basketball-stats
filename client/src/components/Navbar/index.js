import React from "react";
import "./style.css";
import { Navbar } from 'react-bootstrap'
import basketball from '../../images/icons8-basketball-48.png'

function Nav() {

  return (
    <>


  
  <br />
  <Navbar bg="navStyle" className="navStyle" variant="dark">
    <Navbar.Brand>BASKETBALL STATS 
    <img src={basketball} alt="basketball"/>
    </Navbar.Brand>
  </Navbar>
  
  
</>

      
  );
}

export default Nav;