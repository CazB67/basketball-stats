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
    const [seconds, setSeconds] = useState(0);
    const [clockId, setClockId] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    function startTimer() {
        setIsRunning(true)
        setClockId(setInterval(() => {
            setSeconds(seconds => seconds + 1);
          }, 1000))
          
    }

    function formatGameTime() {
        let formattedTime = "";
        let minutes = 0;
        let secs = Math.floor(seconds % 60);
        minutes = Math.floor(seconds / 60)
        if(secs < 10) {
            secs = "0" + secs
        } 
        formattedTime = minutes + ":" + secs;
        return formattedTime;
    }

    function stopTimer() {
        clearInterval(clockId)
        setIsRunning(false)
    }
    
    function handleStartStop() {
        isRunning ? stopTimer() : startTimer();
    }

    function handleReset() {
        setIsRunning(false)
        clearInterval(clockId)
        setSeconds(0)
    }

    return (
          <>
          <Card>
              <Card.Body bg="navStyle" className="navStyle shadow" variant="dark">
              <Card.Text className="text-white text-center">
                  <div>GAME TIME</div>
                  {' '}<button className="timer" onClick={handleStartStop}>{isRunning ? "STOP" : "START"}</button>{' '}  
                  <button className="numberSpan">{formatGameTime()}</button>{' '} 
                  <button className="timer" onClick={handleReset}>RESET</button>       
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
