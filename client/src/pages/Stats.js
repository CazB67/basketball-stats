import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import {Deck, StatsCard, ClockCard} from "../components/Card";
import { Col, Row } from 'react-bootstrap'

function Stats() {
    
    return (
      <>
     <Navbar/>
        <Button/>
        <Deck className="text-center">
        
            <ClockCard skill="gametime"/>
            
        </Deck>
          
          <Row>
            <Col xs={6}md={4}><StatsCard skill="three points made"/></Col>
            <Col xs={6}md={4}><StatsCard skill="3 points missed"/></Col>
            <Col xs={6}md={4}><StatsCard skill="two points made"/></Col>
          
            <Col xs={6}md={4}><StatsCard skill="2 points missed"/></Col>
            <Col xs={6}md={4}><StatsCard skill="one point made"/></Col>
            <Col xs={6}md={4}><StatsCard skill="one point missed"/></Col>
         
            <Col xs={6}md={4}><StatsCard skill="defensive rebound"/></Col>
            <Col xs={6}md={4}><StatsCard skill="offensive rebound"/></Col>
            <Col xs={6}md={4}><StatsCard skill="steal"/></Col>
            
            <Col xs={6}md={4}><StatsCard skill="assist"/></Col>
            <Col xs={6}md={4}><StatsCard skill="foul"/></Col>
            <Col xs={6}md={4}><StatsCard skill="turnover"/></Col>
          </Row>
     <Footer/>
      </>
    );
  }

export default Stats;