import React from "react";
import { Card, CardDeck } from 'react-bootstrap'
import "./style.css";

export function StatsCard({skill}) {

  return (
        <>
       
        <Card>
            <Card.Body bg="navStyle" className="navStyle shadow" variant="dark">
            <Card.Text className="text-white text-center">
                <div>{skill}</div> {' '}
                <i className="fas fa-angle-up"/>
                {' '}<button className="numberSpan">1</button>{' '}
                <i className="fas fa-angle-down"/>
                    
            </Card.Text>
            </Card.Body>
        </Card>
        </>
  );
}

export function ClockCard() {

    return (
          <>
          <Card>
              <Card.Body bg="navStyle" className="navStyle shadow" variant="dark">
              <Card.Text className="text-white text-center">
                  <div>ON THE COURT / ON THE BENCH</div>
                  {' '}<button className="numberSpan">00:00</button>{' '}          
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
