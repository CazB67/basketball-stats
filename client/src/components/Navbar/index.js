import React from "react";
import "./style.css";
import { Navbar } from 'react-bootstrap'
import basketball from '../../images/icons8-basketball-48.png'

function Nav() {

  return (
    <>

<Navbar bg="navStyle" variant="dark" className="navStyle">
    <Navbar.Brand href="">
      <h1>BASKETBALL STATS <img src={basketball} alt="basketball"></img></h1> 
      
    </Navbar.Brand>
  </Navbar>
</>
      
  );
}

export default Nav;