import React from "react";
import { Card, CardDeck } from 'react-bootstrap'
import "./style.css";

export function StatsCard(props) {
    
  return (
        <>
        <Card>
            <Card.Body bg="navStyle" className="navStyle shadow" variant="dark">
            <Card.Text className="text-white text-center">{props.skill}</Card.Text> {' '}
            <Card.Text className="text-white text-center">
                {props.children}
            </Card.Text>
            </Card.Body>
        </Card>
        </>
  );
}

export function CountButton(props) { 
  return (
        <>
        <i className="fas fa-angle-up" onClick={props.upclick}/>
  {' '}<button className="numberSpan" {...props}>{props.children}</button>{' '}
        <i className="fas fa-angle-down" onClick={props.downclick}/>
        </>
  );
}

export function ClockCard(props) {

    return (
          <>
          <Card>
              <Card.Body bg="navStyle" className="navStyle shadow" variant="dark">
              <Card.Title className="text-white text-center">COURT TIME</Card.Title>
              <Card.Text className="text-white text-center">
                  {' '}<button className="timer" onClick={props.handleStartStop}>{props.isRunning}</button>{' '}  
                  <button className="numberSpan">{props.formatGameTime}</button>{' '} 
                  <button className="timer" onClick={props.handleReset}>RESET</button>       
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
