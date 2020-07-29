import React from "react";
import "./style.css";
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../../images/logo.PNG';
import axios from 'axios';

export function StatsNav(props) {

  return (
    <>
      <Navbar bg="navStyle" expand="lg" className="navStyle shadow" variant="dark">
        <Navbar.Brand>
          <img
          src={logo}
          alt="Basketball Stats Logo"
          />
        </Navbar.Brand>
        {props.children}
      </Navbar>
    </> 
  );
}

export function NavLink(props) {
  const logout = () => {
    axios.get('/logout', {withCredentials: true})
        .then((response) => {
            window.location.href = '/'
        }).catch((err) => {
            console.log(err);
        })
}
  return (
    <>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse  className="justify-content-end">
            <Nav>
              <Nav.Link href={"/stats"}>Game</Nav.Link>
              <Nav.Link href={"/display"}>View</Nav.Link>
              <Nav.Link href={"/"}  onClick={logout}>Logout </Nav.Link> 
            </Nav>
          </Navbar.Collapse>
    </> 
  );
}
