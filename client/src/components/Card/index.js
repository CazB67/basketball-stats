import React from "react";
import { Card, CardDeck } from 'react-bootstrap'
import "./style.css";
import upArrow from "../../images/up-arrow.png";
import downArrow from "../../images/down-arrow.png";

export function StatsCard(props) {
    
  return (
        <>
        <Card className={props.visibility}>
            <Card.Body bg="navStyle" className="navStyle shadow mb-1 mt-1" variant="dark">
            <Card.Text className="text-white text-center">{props.skill}</Card.Text> {' '}
            <Card.Text className="text-white text-center">
                {props.children}
            </Card.Text>
            </Card.Body>
        </Card>
        </>
  );
}

export function CountButtonUp(props) { 
  return (
        <img src={upArrow} className="mr-2 arrows" alt="uparrow" name={props.name} onClick={props.onClick}/>
  );
}

export function CountButtonShow(props) { 
  return (
        <button className="numberSpan" {...props}>{props.children}</button>
  );
}

export function CountButtonDown(props) { 
  return (
        <img src={downArrow} className="ml-2 arrows" alt="downarrow" onClick={props.onClick}/>
  );
}

export function ClockCard(props) {
    return (
          <>
            <Card className={props.visibility}>
                  <Card.Body bg="navStyle" className="navStyle shadow" variant="dark">
                        <Card.Title className="text-white text-center court">COURT TIME</Card.Title>
                              <Card.Text className="text-white text-center">
                                    {' '}<button className="timer court mr-2" onClick={props.handleStartStop}>{props.isRunning}</button>{' '}  
                                    <button className="numberSpan">{props.gameTime}</button>{' '}       
                              </Card.Text>
                  </Card.Body>
            </Card>
          </>
    );
  }

export function Deck({children}) {

    return (
          <>
          <CardDeck>
          {children}
          </CardDeck>
          </>
    );
  }
