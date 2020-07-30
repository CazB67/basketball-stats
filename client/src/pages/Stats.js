import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import {OpponentModal, ScoreModal } from "../components/Modal";
import API from "../utils/API";
import {Deck, StatsCard, ClockCard, CountButtonUp, CountButtonDown, CountButtonShow} from "../components/Card";
import { Col, Row } from 'react-bootstrap';
import GlobalStore from "../utils/context/GlobalStore";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import{ StatsNav, NavLink} from "../components/Navbar";
import Footer from "../components/Footer";
import ShotChart from "../components/ShotChart";
import basketballers from '../images/basketballers.png'

function Stats() {
  const store = GlobalStore.useGlobalContext()
  const history = useHistory()

  useEffect(() => {
    
      axios.get('/current-user', {
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
  const [shotChartShow, setShotChartShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [opponent, setOpponent] =useState("");
  const [opponentScore, setOpponentScore] =useState(0);
  const [teamScore, setTeamScore] =useState(0);
  const [validated, setValidated] = useState(true);
  const [visibility, setVisibility] = useState("d-none");
  const [visibilityStart, setVisibilityStart] = useState("timer mb-3 btn-lg mt-3");
  const [visibilityStartTwo, setVisibilityStartTwo] = useState("mb-3 mt-3");
  const [visibilityEnd, setVisibilityEnd] = useState("d-none");

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
      formattedTime = minutes + "." + secs;
      return formattedTime;
  }

  function stopTimer() {
      clearInterval(clockId)
      setIsRunning(false)
  }
  
  function handleStartStop() {
      isRunning ? stopTimer() : startTimer();
  }

  const handleClose = (event) => { 
    if (typeof(event) === 'undefined') {
      return;
    }
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      
    }else {
      setValidated(true);
      setShow(false) 
    }
  };
  
  const handleClose2 = () => setOpen(false)
  const handleClose3 = () => setShow(false)
  const handleClose4 = () => setShotChartShow(false)

  function handleStartGame() {
    setVisibilityStart("d-none")
    setVisibilityStartTwo("d-none")
    setVisibilityEnd("timer mb-3 btn-lg mt-3")
    setVisibility("")
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
      courtTime: 0,
      opponent:"",
      opponentScore: 0,
      teamScore: 0,
    })
}

function handleEndGame(event) {
  event.preventDefault()
  setOpen(true)
  setVisibility("d-none")
  
}

const handleSavingGameData = event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }else {
    setValidated(true);
    setShow(false) 
 
  setCount({...count, courtTime: seconds})
  API.saveGame({
    ...count
  }, seconds, opponent, teamScore, opponentScore)
  .then(() => {
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
    courtTime: 0,
    opponent:"",
    opponentScore: 0,
    teamScore: 0,
  })
  setIsRunning(false)
  clearInterval(clockId)
  setSeconds(0)
  window.location.pathname = "/display"})
  .catch(err => console.log(err));
    
}
}

const handleInputChange = event => {
  event.preventDefault()
  const { value } = event.target;
  setOpponent(value)
}
const handleInputChangeTeamScore = event => {
  event.preventDefault();
  const { value } = event.target;
  setTeamScore(value)
}
const handleInputChangeOpponentScore = event => {
  event.preventDefault()
  const { value } = event.target;
  setOpponentScore(value)
 }

    return (
      <>
      <StatsNav>
        <NavLink/>
      </StatsNav>
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

        <ShotChart
          show={shotChartShow}
          onHide={handleClose4}/>

        <Button
        visibilityStart={visibilityStart}
        visibilityEnd={visibilityEnd}
        onClick={handleStartGame}
        endClick={handleEndGame}
        />

        <Row className="text-center"><Col><img className={visibilityStartTwo} alt="basketballers" src={basketballers}/></Col></Row>
        
        <Deck className="text-center">
            <ClockCard skill="gametime"
            handleStartStop={handleStartStop}
            gameTime={formatGameTime()}
            isRunning={isRunning ? "ON" : "OFF"}
            visibility={visibility}
            />
        </Deck>
          
        <Row>
          <Col xs={6}md={4}>
            <StatsCard 
              visibility={visibility}
              skill="3 pts made" 
              value=""
            >
              <CountButtonUp onClick={() => setCount({...count, threePointerMade: count.threePointerMade + 1})}/>
              <CountButtonShow> {count.threePointerMade} </CountButtonShow>
              <CountButtonDown onClick={() => count.threePointerMade > 0 ? setCount({...count,  threePointerMade: count.threePointerMade - 1}): 0}/>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard 
              visibility={visibility}
              skill="3 pts missed" 
              value=""
            >
              <CountButtonUp onClick={() => setCount({...count, threePointerMissed: count.threePointerMissed + 1})}/>
              <CountButtonShow> {count.threePointerMissed} </CountButtonShow>
              <CountButtonDown onClick={() => count.threePointerMissed > 0 ? setCount({...count,  threePointerMissed: count.threePointerMissed - 1}) : 0}/>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard 
              visibility={visibility}
              skill="2 pts made" 
              value=""
            >
              <CountButtonUp onClick={() => setCount({...count,    twoPointerMade: count.twoPointerMade + 1})}/>
              <CountButtonShow> {count.twoPointerMade} </CountButtonShow>
              <CountButtonDown onClick={() => count.twoPointerMade > 0 ? setCount({...count,  twoPointerMade: count.twoPointerMade - 1}): 0}/>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard 
              visibility={visibility}
              skill="2 pts missed" 
              value=""
            >
              <CountButtonUp onClick={() => setCount({...count,    twoPointerMissed: count.twoPointerMissed + 1})}/>
              <CountButtonShow> {count.twoPointerMissed} </CountButtonShow>
              <CountButtonDown onClick={() => count.twoPointerMissed > 0 ? setCount({...count,  twoPointerMissed: count.twoPointerMissed - 1}) : 0}/>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard 
              visibility={visibility}
              skill="1 pt made" 
              value=""
            >
              <CountButtonUp onClick={() => setCount({...count,    onePointerMade: count.onePointerMade + 1})}/>
              <CountButtonShow> {count.onePointerMade} </CountButtonShow>
              <CountButtonDown onClick={() => count.onePointerMade > 0 ? setCount({...count,  onePointerMade: count.onePointerMade - 1}): 0}/>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard 
              visibility={visibility}
              skill="1 pt miss" 
              value=""
            >
              <CountButtonUp onClick={() => setCount({...count,    onePointerMissed: count.onePointerMissed + 1})}/>
              <CountButtonShow> {count.onePointerMissed} </CountButtonShow>
              <CountButtonDown onClick={() => count.onePointerMissed > 0 ? setCount({...count,  onePointerMissed: count.onePointerMissed - 1}): 0}/>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard 
              visibility={visibility}
              skill="Defensive Rebound" 
              value=""
            >
              <CountButtonUp onClick={() => setCount({...count,    defRebound: count.defRebound + 1})}/>
              <CountButtonShow> {count.defRebound} </CountButtonShow>
              <CountButtonDown onClick={() => count.defRebound > 0 ? setCount({...count,  defRebound: count.defRebound - 1}): 0}/>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard 
              visibility={visibility}
              skill="Offensive Rebound" 
              value=""
            >
              <CountButtonUp onClick={() => setCount({...count,    offRebound: count.offRebound + 1})}/>
              <CountButtonShow> {count.offRebound} </CountButtonShow>
              <CountButtonDown onClick={() => count.offRebound > 0 ? setCount({...count,  offRebound: count.offRebound - 1}): 0}/>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard 
              visibility={visibility}
              skill="Steal" 
              value=""
            >
              <CountButtonUp onClick={() => setCount({...count,    steal: count.steal + 1})}/>
              <CountButtonShow> {count.steal} </CountButtonShow>
              <CountButtonDown onClick={() => count.steal > 0 ? setCount({...count,  steal: count.steal - 1}) : 0}/>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard 
              visibility={visibility}
              skill="Assist" 
              value=""
            >
              <CountButtonUp onClick={() => setCount({...count, assist: count.assist + 1})}/>
              <CountButtonShow> {count.assist} </CountButtonShow>
              <CountButtonDown onClick={() => count.assist > 0 ? setCount({...count, assist: count.assist - 1}): 0}/>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard 
              visibility={visibility}
              skill="Foul" 
              value=""
            >
              <CountButtonUp onClick={() => count.foul < 5 ? setCount({...count, foul: count.foul + 1}): 5}/>
              <CountButtonShow> {count.foul} </CountButtonShow>
              <CountButtonDown onClick={() => count.foul > 0 ? setCount({...count, foul: count.foul - 1}): 0}/>
            </StatsCard>
          </Col>
          <Col xs={6}md={4}>
            <StatsCard 
              visibility={visibility}
              skill="Turnover" 
              value=""
            >
              <CountButtonUp onClick={() => setCount({...count, turnover: count.turnover + 1})}/>
              <CountButtonShow> {count.turnover} </CountButtonShow>
              <CountButtonDown onClick={() => count.turnover > 0 ? setCount({...count, turnover: count.turnover - 1}): 0}/>
            </StatsCard>
          </Col>
          
        </Row>
        <Footer/>
      </>
    );
  }

export default Stats;