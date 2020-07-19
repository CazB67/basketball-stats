import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Deck, StatsCard, ClockCard} from "../components/Card";

function Stats() {
    
    return (
      <>
     <Navbar/>
        <Deck>
            <ClockCard skill="gametime"/>
            
        </Deck>
        <Deck>
          <StatsCard skill="3 points made"/>
          <StatsCard skill="3 points missed"/> 
          <StatsCard skill="2 points made"/>
          <StatsCard skill="2 points missed"/>
          <StatsCard skill="1 point made"/>
          </Deck>
          <Deck>
          <StatsCard skill="1 point missed"/>
          <StatsCard skill="defensive rebound"/> 
          <StatsCard skill="offensive rebound"/>
          <StatsCard skill="steal"/>
          <StatsCard skill="assist"/>
        </Deck>
     <Footer/>
      </>
    );
  }

export default Stats;