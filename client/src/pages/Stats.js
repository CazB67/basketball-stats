import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import {OpponentModal, ScoreModal } from "../components/Modal";
import API from "../utils/API";
import {Deck, StatsCard, ClockCard, CountButton} from "../components/Card";
import { Col, Row } from 'react-bootstrap';
import GlobalStore from "../utils/context/GlobalStore";
import { useHistory } from "react-router-dom";
import axios from 'axios';

function Stats() {
  const store = GlobalStore.useGlobalContext()
  const history = useHistory()

  useEffect(() => {
    
      axios.get('http://localhost:3001/current-user', {
          withCredentials: true,
      })
          .then((response) => {
              store.auth.dispatchAuth({
                  type: 'set-user',
                  payload: response.data.data
              })
          }).catch((err) => {
            console.log(err.response.status);
              if(err.response.status === 401){
                  return history.push('/')
              }
              console.log("ererererer" + {err});
          })
  }, [])

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
  const handleClose3 = () => setShow(false)

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
          handleClose3={handleClose3}
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
              skill="3 pts made" 
              value=""
            >
              <CountButton 
                up={() => setCount({...count,    threePointerMade: count.threePointerMade + 1})}
                down={() => count.threePointerMade > 0 ? setCount({...count,  threePointerMade: count.threePointerMade - 1}): 0}>{count.threePointerMade} 
              </CountButton>   
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard skill="3 pts missed">
              <CountButton 
                up={() => setCount({...count,    threePointerMissed: count.threePointerMissed + 1})}
                down={() => count.threePointerMissed > 0 ? setCount({...count,  threePointerMissed: count.threePointerMissed - 1}) : 0}>{count.threePointerMissed}
              </CountButton>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard skill="2 pts made">
              <CountButton 
                up={() => setCount({...count,    twoPointerMade: count.twoPointerMade + 1})}
                down={() => count.twoPointerMade > 0 ? setCount({...count,  twoPointerMade: count.twoPointerMade - 1}) : 0}>{count.twoPointerMade}
              </CountButton>
            </StatsCard>
          </Col>
        
          <Col xs={6}md={4}>
            <StatsCard skill="2 pts missed">
              <CountButton 
                up={() => setCount({...count,    twoPointerMissed: count.twoPointerMissed + 1})}
                down={() => count.twoPointerMissed > 0 ? setCount({...count,  twoPointerMissed: count.twoPointerMissed - 1}) : 0}>{count.twoPointerMissed}
              </CountButton>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard skill="1 pt made">
              <CountButton 
                up={() => setCount({...count,    onePointerMade: count.onePointerMade + 1})}
                down={() => count.onePointerMade > 0 ? setCount({...count,  onePointerMade: count.onePointerMade - 1}): 0}>{count.onePointerMade}
              </CountButton>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard skill="1 pt miss">
              <CountButton 
                up={() => setCount({...count,    onePointerMissed: count.onePointerMissed + 1})}
                down={() => count.onePointerMissed > 0 ? setCount({...count,  onePointerMissed: count.onePointerMissed - 1}): 0}>{count.onePointerMissed}
              </CountButton>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard skill="defensive rebound">
              <CountButton 
                up={() => setCount({...count,    defRebound: count.defRebound + 1})}
                down={() => count.defRebound > 0 ? setCount({...count,  defRebound: count.defRebound - 1}): 0}>{count.defRebound}
              </CountButton>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard skill="offensive rebound">
              <CountButton 
                up={() => setCount({...count,    offRebound: count.offRebound + 1})}
                down={() => count.offRebound > 0 ? setCount({...count,  offRebound: count.offRebound - 1}): 0}>{count.offRebound}
              </CountButton>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard skill="steal">
              <CountButton 
                up={() => setCount({...count,    steal: count.steal + 1})}
                down={() => count.steal > 0 ? setCount({...count,  steal: count.steal - 1}) : 0}>{count.steal}
              </CountButton>
            </StatsCard>
          </Col>
          
          <Col xs={6}md={4}>
            <StatsCard skill="assist">
              <CountButton 
                up={() => setCount({...count, assist: count.assist + 1})}
                down={() => count.assist > 0 ? setCount({...count, assist: count.assist - 1}): 0}>{count.assist}
              </CountButton>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard skill="foul">
              <CountButton 
                  up={() => setCount({...count, foul: count.foul + 1})}
                  down={() => count.foul > 0 ? setCount({...count, foul: count.foul - 1}): 0}>{count.foul}
              </CountButton>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard skill="turnover">
              <CountButton 
                up={() => setCount({...count, turnover: count.turnover + 1})}
                down={() => count.turnover > 0 ? setCount({...count, turnover: count.turnover - 1}): 0}>{count.turnover}
              </CountButton>
            </StatsCard>
          </Col>
        </Row>
    
      </>
    );
  }

export default Stats;