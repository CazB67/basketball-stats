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
    teamScore: 0,
    area1Made: 0,
    area2Made: 0,
    area3Made: 0,
    area4Made: 0,
    area5Made: 0,
    area6Made: 0,
    area7Made: 0,
    area8Made: 0,
    area9Made: 0,
    area10Made: 0,
    area11Made: 0,
    area12Made: 0,
    area13Made: 0,
    area14Made: 0,
    area15Made: 0,
    area16Made: 0,
    area1Missed: 0,
    area2Missed: 0,
    area3Missed: 0,
    area4Missed: 0,
    area5Missed: 0,
    area6Missed: 0,
    area7Missed: 0,
    area8Missed: 0,
    area9Missed: 0,
    area10Missed: 0,
    area11Missed: 0,
    area12Missed: 0,
    area13Missed: 0,
    area14Missed: 0,
    area15Missed: 0,
    area16Missed: 0

  });

  const [seconds, setSeconds] = useState(0);
  const [clockId, setClockId] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [show, setShow] = useState(false);
  const [shotChartShowMade, setShotChartShowMade] = useState(false);
  const [shotChartShowMissed, setShotChartShowMissed] = useState(false);
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
  const handleClose4 = () => setShotChartShowMade(false)
  const handleClose5 = () => setShotChartShowMissed(false)

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
      area1Made: 0,
      area2Made: 0,
      area3Made: 0,
      area4Made: 0,
      area5Made: 0,
      area6Made: 0,
      area7Made: 0,
      area8Made: 0,
      area9Made: 0,
      area10Made: 0,
      area11Made: 0,
      area12Made: 0,
      area13Made: 0,
      area14Made: 0,
      area15Made: 0,
      area16Made: 0,
      area1Missed: 0,
      area2Missed: 0,
      area3Missed: 0,
      area4Missed: 0,
      area5Missed: 0,
      area6Missed: 0,
      area7Missed: 0,
      area8Missed: 0,
      area9Missed: 0,
      area10Missed: 0,
      area11Missed: 0,
      area12Missed: 0,
      area13Missed: 0,
      area14Missed: 0,
      area15Missed: 0,
      area16Missed: 0
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
    area1Made: 0,
      area2Made: 0,
      area3Made: 0,
      area4Made: 0,
      area5Made: 0,
      area6Made: 0,
      area7Made: 0,
      area8Made: 0,
      area9Made: 0,
      area10Made: 0,
      area11Made: 0,
      area12Made: 0,
      area13Made: 0,
      area14Made: 0,
      area15Made: 0,
      area16Made: 0,
      area1Missed: 0,
      area2Missed: 0,
      area3Missed: 0,
      area4Missed: 0,
      area5Missed: 0,
      area6Missed: 0,
      area7Missed: 0,
      area8Missed: 0,
      area9Missed: 0,
      area10Missed: 0,
      area11Missed: 0,
      area12Missed: 0,
      area13Missed: 0,
      area14Missed: 0,
      area15Missed: 0,
      area16Missed: 0
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

 function handleOnClick(event ) {
  event.preventDefault()
  const { name } = event.target;
  
  switch(name) {
    case "threePointerMade":
      setCount({...count, threePointerMade: count.threePointerMade + 1})
      setShotChartShowMade(true)
      break;
    case "threePointerMissed":
      setCount({...count, threePointerMissed: count.threePointerMissed + 1})
      setShotChartShowMissed(true)
      break;
    case "twoPointerMade":
      setCount({...count, twoPointerMade: count.twoPointerMade + 1})
      setShotChartShowMade(true)
      break;
    case "twoPointerMissed":
      setCount({...count, twoPointerMissed: count.twoPointerMissed + 1})
      setShotChartShowMissed(true)
      break;
    case "onePointerMade":
      setCount({...count, onePointerMade: count.onePointerMade + 1})
      setShotChartShowMade(true)
      break;
    case "onePointerMissed":
      setCount({...count, onePointerMissed: count.onePointerMissed + 1})
      setShotChartShowMissed(true)
    break;
    default:
      // code block
  }
 
}

const MAP = {
  name: "my-map",
  areas: [
      {
          name: "left three pointer baseline",
          shape: "poly",
          coords: [3,1,31,4,29,46,0,47],
          value: 1,
          alt: "left three pointer baseline",
          preFillColor: "rgba(255, 255, 255, 0.3)",
          strokeColor: "rgba(43, 22, 106, 1)"
      },
      {
          name: "right three pointer baseline",
          shape: "poly",
          coords: [302,2,329,4,329,50,302,53],
          value: 2,
          alt:"right three pointer baseline",
          preFillColor: "rgba(255, 255, 255, 0.3)",
          strokeColor: "rgba(43, 22, 106, 1)"
      },
      {
          name: "left three pointer 33degrees",
          shape: "poly",
          coords: [2,48,28,47,31,69,41,101,53,122,2,129],
          alt:"left three pointer 33degrees",
          value: 3,
          preFillColor: "rgba(255, 255, 255, 0.3)",
          strokeColor: "rgba(43, 22, 106, 1)"
      },
      {
          name: "left three pointer 45degrees",
          value: 4,
          shape: "poly",
          coords: [3,131,55,125,107,169,4,285],
          alt:"left three pointer",
          preFillColor: "rgba(43, 22, 106, 1)"
      },
      {
          name: "right three pointer 33degrees",
          alt: "right three pointer 33degrees",
          value: 5,
          shape: "poly",
          coords: [302,56,327,54,329,133,274,131],
          preFillColor: "rgba(255, 255, 255, 0.3)",
          strokeColor: "rgba(43, 22, 106, 1)"
      },
      {
          name: "right three pointer 45degrees",
          alt: "right three pointer 45degrees",
          value: 6,
          shape: "poly",
          coords: [271,127,328,132,329,284,223,172],
          preFillColor: "rgba(43, 22, 106, 1)"
      },
      {
          name: "centre three pointer",
          alt: "centre three pointer",
          value: 7,
          shape: "poly",
          coords: [102,171,65,215,259,215,219,171,187,177,146,180],
          preFillColor: "rgba(255, 255, 255, 0.3)",
          strokeColor: "rgba(43, 22, 106, 1)"
      },
      {
          name: "centre deep three pointer",
          alt: "centre deep three pointer",
          value: 8,
          shape: "poly",
          coords: [1,290,325,292,326,284,260,218,66,219,59,228,51,236],
          preFillColor: "rgba(255, 255, 255, 0.3)",
          strokeColor: "rgba(43, 22, 106, 1)"
      },
      {
          name: "left under hoop",
          alt: "left under hoop",
          value: 9,
          shape: "rect",
          coords: [127,24,166,58],
          preFillColor: "rgba(255, 255, 255, 0.3)",
          strokeColor: "rgba(43, 22, 106, 1)"
      },
      {
          name: "right under hoop",
          alt: "right under hoop",
          value: 10,
          shape: "rect",
          coords: [168,26,202,58],
          preFillColor: "rgba(255, 255, 255, 0.3)",
          strokeColor: "rgba(43, 22, 106, 1)"
      },
      {
          name: "right midrange",
          alt: "right midrange",
          value: 11,
          shape: "poly",
          coords: [206,28,301,26,302,46,296,66,288,84,280,104,271,123,249,142,229,162,213,169,204,171],
          preFillColor: "rgba(43, 22, 106, 1)"
      },
      {
          name: "left midrange",
          alt: "left midrange",
          value: 12,
          shape: "poly",
          coords: [125,25,31,26,33,49,37,80,47,110,64,129,81,142,89,153,112,166,123,175],
          preFillColor: "rgba(43, 22, 106, 1)"
      },
      {
          name: "deep midrange",
          alt: "deep midrange",
          value: 13,
          shape: "poly",
          coords: [124,131,203,126,201,176,126,174],
          lineWidth: 2,
          preFillColor: "rgba(255, 255, 255, 0.3)",
          strokeColor: "rgba(43, 22, 106, 1)"
      },
      {
          name: "left keyway",
          alt: "left keyway",
          value: 14,
          shape: "poly",
          coords: [128,61,162,61,165,117,125,118],
          preFillColor: "rgba(255, 255, 255, 0.3)",
          strokeColor: "rgba(43, 22, 106, 1)"
      },
      {
          name: "right keyway",
          alt: "right keyway",
          value: 15,
          shape: "poly",
          coords: [165,63,202,63,202,114,168,115],
          preFillColor: "rgba(255, 255, 255, 0.3)",
          strokeColor: "rgba(43, 22, 106, 1)"
      },
      {
          name: "foul",
          alt: "foul",
          value: 16,
          shape: "poly",
          coords: [127,122,199,117,200,126,127,130],
          preFillColor: "rgba(255, 255, 255, 0.3)",
          strokeColor: "rgba(43, 22, 106, 1)"
      }

  ]
};

function clicked(area, made) {
  switch(area.value) {
    case 1:
      if(made === 1) {
        setCount({...count, area1Made: count.area1Made + 1})
        setShotChartShowMade(false)
      }
      else {
        setCount({...count, area1Missed: count.area1Missed + 1})
        setShotChartShowMissed(false)
      }
      break;
    case 2:
      if(made === 1) {
        setCount({...count, area2Made: count.area2Made + 1})
        setShotChartShowMade(false)
      }
      else {
        setCount({...count, area2Missed: count.area2Missed + 1})
        setShotChartShowMissed(false)
      }
      break;
    case 3:
      if(made === 1) {
        setCount({...count, area3Made: count.area3Made + 1})
        setShotChartShowMade(false)
      }
      else {
        setCount({...count, area3Missed: count.area3Missed + 1})
        setShotChartShowMissed(false)
      }
      break;
    case 4:
    if(made === 1) {
      setCount({...count, area4Made: count.area4Made + 1})
      setShotChartShowMade(false)
    }
    else {
      setCount({...count, area4Missed: count.area4Missed + 1})
      setShotChartShowMissed(false)
    }
    break;
  case 5:
    if(made === 1) {
      setCount({...count, area5Made: count.area5Made + 1})
      setShotChartShowMade(false)
    }
    else {
      setCount({...count, area5Missed: count.area5Missed + 1})
      setShotChartShowMissed(false)
    }
    break;
  case 6:
    if(made === 1) {
      setCount({...count, area6Made: count.area6Made + 1})
      setShotChartShowMade(false)
    }
    else {
      setCount({...count, area6Missed: count.area6Missed + 1})
      setShotChartShowMissed(false)
    }
    break;
  case 7:
    if(made === 1) {
      setCount({...count, area7Made: count.area7Made + 1})
      setShotChartShowMade(false)
    }
    else {
      setCount({...count, area7Missed: count.area7Missed + 1})
      setShotChartShowMissed(false)
    }
    break;
  case 8:
    if(made === 1) {
      setCount({...count, area8Made: count.area8Made + 1})
      setShotChartShowMade(false)
    }
    else {
      setCount({...count, area8Missed: count.area8Missed + 1})
      setShotChartShowMissed(false)
    }
    break;
  case 9:
    if(made === 1) {
      setCount({...count, area9Made: count.area9Made + 1})
      setShotChartShowMade(false)
    }
    else {
      setCount({...count, area9Missed: count.area9Missed + 1})
      setShotChartShowMissed(false)
    }
    break;
  case 10:
    if(made === 1) {
      setCount({...count, area10Made: count.area10Made + 1})
      setShotChartShowMade(false)
    }
    else {
      setCount({...count, area10Missed: count.area10Missed + 1})
      setShotChartShowMissed(false)
    }
    break;
  case 11:
    if(made === 1) {
      setCount({...count, area11Made: count.area11Made + 1})
      setShotChartShowMade(false)
    }
    else {
      setCount({...count, area11Missed: count.area11Missed + 1})
      setShotChartShowMissed(false)
    }
    break;
  case 12:
    if(made === 1) {
      setCount({...count, area12Made: count.area12Made + 1})
      setShotChartShowMade(false)
    }
    else {
      setCount({...count, area12Missed: count.area12Missed + 1})
      setShotChartShowMissed(false)
    }
    break;
  case 13:
    if(made === 1) {
      setCount({...count, area13Made: count.area13Made + 1})
      setShotChartShowMade(false)
    }
    else {
      setCount({...count, area13Missed: count.area13Missed + 1})
      setShotChartShowMissed(false)
    }
    break;
  case 14:
    if(made === 1) {
      setCount({...count, area14Made: count.area14Made + 1})
      setShotChartShowMade(false)
    }
    else {
      setCount({...count, area14Missed: count.area14Missed + 1})
      setShotChartShowMissed(false)
    }
    break;
  case 15:
    if(made === 1) {
      setCount({...count, area15Made: count.area15Made + 1})
      setShotChartShowMade(false)
    }
    else {
      setCount({...count, area15Missed: count.area15Missed + 1})
      setShotChartShowMissed(false)
    }
    break;
    case 16:
    if(made === 1) {
      setCount({...count, area16Made: count.area16Made + 1})
      setShotChartShowMade(false)
    }
    else {
      setCount({...count, area16Missed: count.area16Missed + 1})
      setShotChartShowMissed(false)
    }
    break;
    default:
      // code block
  }
  
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
          show={shotChartShowMade}
          onClick={area => clicked(area,1)}
          MAP={MAP}
          onHide={handleClose4}/>

        <ShotChart
          show={shotChartShowMissed}
          onClick={area => clicked(area,0)}
          MAP={MAP}
          onHide={handleClose5}/>

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
              <CountButtonUp name="threePointerMade" onClick={handleOnClick}/>
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
              <CountButtonUp name="threePointerMissed" onClick={handleOnClick}/>
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
              <CountButtonUp name="twoPointerMade" onClick={handleOnClick}/>
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
              <CountButtonUp name="twoPointerMissed" onClick={handleOnClick}/>
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
              <CountButtonUp name="onePointerMade" onClick={handleOnClick}/>
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
              <CountButtonUp name="onePointerMissed" onClick={handleOnClick}/>
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