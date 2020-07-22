import React, { useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import {OpponentModal, ScoreModal } from "../components/Modal";
import API from "../utils/API";
import {Deck, StatsCard, ClockCard, CountButton} from "../components/Card";
import { Col, Row } from 'react-bootstrap'

function Stats() {

  const [count, setCount] = useState({
    threePointerMade: 0,
    threePointerMissed: 0,
    twoPointerMade: 0,
    twoPointerMissed: 0,
    onePointerMade: 0,
    onePointerMissed: 0,
    offRebound: 0,
    defRebound: 0,
    steal: 0,
    assist: 0,
    foul: 0,
    turnover: 0,
    courtTime: 0,
    opponent:"",
    opponentScore: 0,
    teamScore: 0
  });

  const [seconds, setSeconds] = useState(0);
  const [clockId, setClockId] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [opponent, setOpponent] =useState("");
  const [opponentScore, setOpponentScore] =useState(0);
  const [teamScore, setTeamScore] =useState(0);
  const [validated, setValidated] = useState(true);
  
  function startTimer() {
      setIsRunning(true)
      setClockId(setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000))  
  }

  function formatGameTime() {
      let formattedTime = "";
      let minutes = 0;
      //console.log(seconds);
      let secs = Math.floor(seconds % 60);
      minutes = Math.floor(seconds / 60)
      if(secs < 10) {
          secs = "0" + secs
      } 
      formattedTime = minutes + ":" + secs;
      //console.log(formattedTime);
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

  const handleClose = (event) => { 
    if (typeof(event) === 'undefined') {
      console.log("booooo");
      return;
    }
    event.preventDefault();
    const form = event.currentTarget;
    console.log(opponent + "***************");
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      
    }else {
      console.log(show + "show");
      setValidated(true);
      setShow(false) 
    }
  
  };
  
  const handleClose2 = () => setOpen(false)

  function handleStartGame() {
    setShow(true)
    setCount({
      threePointerMade: 0,
      threePointerMissed: 0,
      twoPointerMade: 0,
      twoPointerMissed: 0,
      onePointerMade: 0,
      onePointerMissed: 0,
      offRebound: 0,
      defRebound: 0,
      steal: 0,
      assist: 0,
      foul: 0,
      turnover: 0,
      courtTime: "",
      opponent:"",
      opponentScore: 0,
      teamScore: 0,
    })
}

function handleEndGame(event) {
  event.preventDefault()
  setOpen(true)
}

const handleSavingGameData = event => {
  console.log("hi");
  event.preventDefault();
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    console.log("false");
    event.preventDefault();
    event.stopPropagation();
    
  }else {
    console.log("true");
    setValidated(true);
    setShow(false) 
 
  setCount({...count, courtTime: seconds})
  API.saveGame({
    ...count
  }, formatGameTime(), opponent, teamScore, opponentScore)
  setOpen(false)
  setCount({
    threePointerMade: 0,
    threePointerMissed: 0,
    twoPointerMade: 0,
    twoPointerMissed: 0,
    onePointerMade: 0,
    onePointerMissed: 0,
    offRebound: 0,
    defRebound: 0,
    steal: 0,
    assist: 0,
    foul: 0,
    turnover: 0,
    courtTime: "",
    opponent:"",
    opponentScore: 0,
    teamScore: 0,
  })
  setIsRunning(false)
  clearInterval(clockId)
  setSeconds(0)
}
}

const handleInputChange = event => {
  event.preventDefault()
  const { value } = event.target;
  console.log(value);
  setOpponent(value)
}
const handleInputChangeTeamScore = event => {
  event.preventDefault();
  const { value } = event.target;
  console.log(value);
  setTeamScore(value)
}
const handleInputChangeOpponentScore = event => {
  event.preventDefault()
  const { value } = event.target;
  console.log(value);
  setOpponentScore(value)
 }
    return (
      <>
      <Navbar/>

      <ScoreModal
            handleClose={handleClose2}
            handleStartGame={handleStartGame}
            show={open}
            teamScoreInput={handleInputChangeTeamScore}
            oppScoreInput={handleInputChangeOpponentScore}
            value={teamScore}
            value2={opponentScore}
            handleSavingGameData={handleSavingGameData}
            validated={validated}
        />
        
        <OpponentModal
          handleClose={handleClose}
          handleStartGame={handleStartGame}
          show={show}
          onChange={handleInputChange}
          value={opponent}
          validated={validated}
        />

        <Button
        onClick={handleStartGame}
        endClick={handleEndGame}
        />

        <Deck className="text-center">
            <ClockCard skill="gametime"
            handleStartStop={handleStartStop}
            gameTime={formatGameTime()}
            handleReset={handleReset}
            isRunning={isRunning ? "STOP" : "START"}
            />
        </Deck>
          
        <Row>
          <Col xs={6}md={4}>
            <StatsCard 
              skill="3 pointer made" 
              value=""
            >
              <CountButton 
                upclick={() => setCount({...count,    threePointerMade: count.threePointerMade + 1})}
                downclick={() => count.threePointerMade > 0 ? setCount({...count,  threePointerMade: count.threePointerMade - 1}): 0}>{count.threePointerMade} 
              </CountButton>   
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard skill="3 pointer miss">
              <CountButton 
                upclick={() => setCount({...count,    threePointerMissed: count.threePointerMissed + 1})}
                downclick={() => count.threePointerMissed > 0 ? setCount({...count,  threePointerMissed: count.threePointerMissed - 1}) : 0}>{count.threePointerMissed}
              </CountButton>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard skill="2 pointer made">
              <CountButton 
                upclick={() => setCount({...count,    twoPointerMade: count.twoPointerMade + 1})}
                downclick={() => count.twoPointerMade > 0 ? setCount({...count,  twoPointerMade: count.twoPointerMade - 1}) : 0}>{count.twoPointerMade}
              </CountButton>
            </StatsCard>
          </Col>
        
          <Col xs={6}md={4}>
            <StatsCard skill="2 pointer miss">
              <CountButton 
                upclick={() => setCount({...count,    twoPointerMissed: count.twoPointerMissed + 1})}
                downclick={() => count.twoPointerMissed > 0 ? setCount({...count,  twoPointerMissed: count.twoPointerMissed - 1}) : 0}>{count.twoPointerMissed}
              </CountButton>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard skill="1 pointer made">
              <CountButton 
                upclick={() => setCount({...count,    onePointerMade: count.onePointerMade + 1})}
                downclick={() => count.onePointerMade > 0 ? setCount({...count,  onePointerMade: count.onePointerMade - 1}): 0}>{count.onePointerMade}
              </CountButton>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard skill="1 pointer miss">
              <CountButton 
                upclick={() => setCount({...count,    onePointerMissed: count.onePointerMissed + 1})}
                downclick={() => count.onePointerMissed > 0 ? setCount({...count,  onePointerMissed: count.onePointerMissed - 1}): 0}>{count.onePointerMissed}
              </CountButton>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard skill="defensive rebound">
              <CountButton 
                upclick={() => setCount({...count,    defRebound: count.defRebound + 1})}
                downclick={() => count.defRebound > 0 ? setCount({...count,  defRebound: count.defRebound - 1}): 0}>{count.defRebound}
              </CountButton>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard skill="offensive rebound">
              <CountButton 
                upclick={() => setCount({...count,    offRebound: count.offRebound + 1})}
                downclick={() => count.offRebound > 0 ? setCount({...count,  offRebound: count.offRebound - 1}): 0}>{count.offRebound}
              </CountButton>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard skill="steal">
              <CountButton 
                upclick={() => setCount({...count,    steal: count.steal + 1})}
                downclick={() => count.steal > 0 ? setCount({...count,  steal: count.steal - 1}) : 0}>{count.steal}
              </CountButton>
            </StatsCard>
          </Col>
          
          <Col xs={6}md={4}>
            <StatsCard skill="assist">
              <CountButton 
                upclick={() => setCount({...count, assist: count.assist + 1})}
                downclick={() => count.assist > 0 ? setCount({...count, assist: count.assist - 1}): 0}>{count.assist}
              </CountButton>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard skill="foul">
              <CountButton 
                  upclick={() => setCount({...count, foul: count.foul + 1})}
                  downclick={() => count.foul > 0 ? setCount({...count, foul: count.foul - 1}): 0}>{count.foul}
              </CountButton>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard skill="turnover">
              <CountButton 
                upclick={() => setCount({...count, turnover: count.turnover + 1})}
                downclick={() => count.turnover > 0 ? setCount({...count, turnover: count.turnover - 1}): 0}>{count.turnover}
              </CountButton>
            </StatsCard>
          </Col>
        </Row>
     <Footer/>
      </>
    );
  }

export default Stats;