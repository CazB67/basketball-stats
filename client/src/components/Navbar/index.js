import React from "react";
import "./style.css";
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../../images/logo.PNG';
import axios from 'axios';
import GlobalStore from "../../utils/context/GlobalStore";
import isEmpty from 'lodash/isEmpty'

function StatsNav(props) {
  const logout = () => {
    axios.get('http://localhost:3001/logout', {withCredentials: true})
        .then((response) => {
            window.location.href = '/'
        }).catch((err) => {
            console.log(err);
        })
}
const store = GlobalStore.useGlobalContext()
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
                !isEmpty(store.auth.currentUser)
                ? "d-none"
                : ""}>
              
              <Nav.Link href={"/stats"}>Game</Nav.Link>
              <Nav.Link href={"/display"}>View</Nav.Link>
              <Nav.Link href={"/"}  onClick={logout}>Logout </Nav.Link> 
              </Nav>
          </Navbar.Collapse>
    

  
    
      </Navbar>
    </>

      
  );
}

export default StatsNav;