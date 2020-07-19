import React, { useState} from "react";
import { Card, CardDeck } from 'react-bootstrap'
import "./style.css";



export function StatsCard(props) {
    const [count, setCount] = useState(0);
  return (
        <>
       
        <Card>
            <Card.Body bg="navStyle" className="navStyle shadow" variant="dark">
            <Card.Text className="text-white text-center">
                <div>{props.skill}</div> {' '}
                <i className="fas fa-angle-up" onClick={() => setCount(count + 1)}/>
                {' '}<button className="numberSpan">{count}</button>{' '}
                <i className="fas fa-angle-down" onClick={() => setCount(count - 1)}/>
                    
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
