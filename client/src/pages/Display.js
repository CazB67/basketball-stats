import React, { useState, useEffect } from "react";
import {DataTable, TableHeader, TableWrapper} from "../components/Table";
import API from "../utils/API";
import GlobalStore from "../utils/context/GlobalStore";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import{ StatsNav, NavLink} from "../components/Navbar";
import PieChart from "../components/PieChart";
import * as d3 from "d3";
import { Col, Row, Tabs, Tab, Table, Modal, Button } from 'react-bootstrap';
import Footer from "../components/Footer";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import court2 from "../images/court2.png";
import "./style.css";

function Display() {

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
              if(err.response.status === 401){
                  return history.push('/')
              }
              console.log("Error " + {err});
          })
  }, [])

  const [rebounds, setRebounds] = useState([]);
  const [data, setData] = useState([]);

  const [twoPoints, setTwoPoints] = useState([])
  const [dataTwoPoints, setDataTwoPoints] = useState([])

  const [threePoints, setThreePoints] = useState([]);
  const [dataThreePoints, setDataThreePoints] = useState([]);

  const [generalPlay, setGeneralPlay] = useState([]);
  const [dataGeneralPlay, setDataGeneralPlay] = useState([]);
  const [stats, setStats] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false)
  const generateReboundData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: rebounds[index]
    }));

    const generateTwoPointData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: twoPoints[index]
    }));

    const generateThreePointData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: value === null || value === undefined ? threePoints[index] : value
    }));

    const generatePlayData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: generalPlay[index]
    }));

    function formatGameTime(seconds) {
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

    useEffect(
      () => {
        setData(generateReboundData());
      },
      [!data]
    );

    useEffect(() => {
      getSavedStats();
    }, [])

    useEffect(() => {
      setRebounds(getRebounds);
    }, [stats])

    useEffect(() => {
      setData(generateReboundData());
      setDataTwoPoints(generateTwoPointData());
      setDataThreePoints(generateThreePointData());
      setDataGeneralPlay(generatePlayData());
    },[rebounds, twoPoints, threePoints, generalPlay]);

  function getRebounds() {
    setRebounds([stats.reduce((acc, stat) => acc + stat.offRebound, 0), stats.reduce((acc, stat) => acc + stat.defRebound, 0)]);
    setTwoPoints([stats.reduce((acc, stat) => acc + stat.twoPointerMade, 0), stats.reduce((acc, stat) => acc + stat.twoPointerMissed, 0)]);
    setThreePoints([stats.reduce((acc, stat) => acc + stat.threePointerMade, 0), stats.reduce((acc, stat) => acc + stat.threePointerMissed, 0)]);
    setGeneralPlay([stats.reduce((acc, stat) => acc + stat.assist, 0), stats.reduce((acc, stat) => acc + stat.steal, 0),stats.reduce((acc, stat) => acc + stat.turnover, 0),stats.reduce((acc, stat) => acc + stat.foul, 0)]);
  }

  function getSavedStats() {
    API.getSavedStats()
      .then(res => setStats(res.data))
      .catch(err => console.log(err));
  };
  const [ selectedItem, setSelectedItem ] = useState()
  function handleModal(id) {
    setShow(true)
    setSelectedItem(id)
  };

  function handleDelete() {
    
    API.deleteStat(selectedItem)
    .then(res => getSavedStats())
    .then(setShow(false))
    .catch(err => console.log(err));
  };

  const barChartstate = {
    dataBar: {
      labels: stats.map(stat => (stat.opponent.toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') + " " + stat.createdAt.substring(5,10).split("-").reverse().join("/"))),
      datasets: [
        {
          label: "Minutes",
          barPercentage: 1,
          data: stats.map(stat => ( formatGameTime(stat.courtTime))),
          backgroundColor: 
            "rgba(255, 218, 128,0.4)",
          borderWidth: 2,
          borderColor: 
            "rgba(255, 218, 128, 1)",
        }
      ]
    },
    barChartOptions: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
              color: "rgba(0, 0, 0, 0.1)"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  }

  const state = {
    dataLine: {
      labels:  stats.map(stat => (stat.opponent.toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') + " " + stat.createdAt.substring(5,10).split("-").reverse().join("/"))),
      datasets: [
        {
          label: "Total Points",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, .3)",
          borderColor: "rgb(205, 130, 158)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(205, 130,1 58)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: stats.map(stat => ( stat.totalPoints))
        },
        {
          label: "Total Rebounds",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(181, 213, 232, .3)",
          borderColor: "rgba(59, 143, 191, 1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(205, 130,1 58)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: stats.map(stat => (stat.totalRebounds))
        },
        {
          label: "Assists",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(181, 232, 189, 1)",
          borderColor: "rgba(46, 148, 63, 1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(205, 130,1 58)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: stats.map(stat => (stat.assist))
        }
      ]
    }
  };
  
    return (
      <>
        <Modal backdrop="static" show={show} onHide={handleClose}>
      

        <Modal.Body>
          <p>Are you sure you want to delete game?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleDelete}>Yes</Button>
          <Button variant="primary" onClick={() => setShow(false)}>No</Button>
        </Modal.Footer>
      </Modal>
      <StatsNav>
        <NavLink/>
      </StatsNav>
      <Tabs defaultActiveKey="allstats" id="uncontrolled-tab-example" style={{fontFamily: 'Red Rose', backgroundColor: "#e0cdea"}}>
      <Tab eventKey="allstats" title="Stats"  >
        <h3 className="mt-3 mb-3" style={{fontFamily: 'Red Rose'}}>All Stats</h3>
          <TableWrapper>
            <TableHeader/>
              {stats.map(stat => (
              <DataTable
                key={stat._id}
                date={stat.createdAt.substring(0,10).split("-").reverse().join("-")}
                opponent={stat.opponent
                  .toLowerCase()
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
                score={stat.finalScore}
                onemade={stat.onePointerMade}
                onemissed={stat.onePointerMissed}
                twomade={stat.twoPointerMade}
                twomissed={stat.twoPointerMissed}
                threemade={stat.threePointerMade}
                threemissed={stat.threePointerMissed}
                defreb={stat.defRebound}
                offreb={stat.offRebound}
                steal={stat.steal}
                assist={stat.assist}
                foul={stat.foul}
                turnover={stat.turnover}
                courttime={formatGameTime(stat.courtTime)}
                onClick={() => handleModal(stat._id)}
                shareUrl={"https://basketball-stats39.herokuapp.com/share/" + stat._id}
              />
              ))}

          </TableWrapper>
      </Tab>
  <Tab eventKey="pergamestats" title="Game Stats">
    <LineChart dataLine={state.dataLine}/>
  </Tab>
  <Tab eventKey="minutes" title="Minutes">
    <h3 className="mt-3 mb-3" style={{fontFamily: 'Red Rose'}}>Per Game Minutes</h3>
    <BarChart dataBar={barChartstate.dataBar} options={barChartstate.barChartOptions}/>
  </Tab>
  <Tab eventKey="careerstats" title="Season" >
    <h3 className="mt-3 mb-3" style={{fontFamily: 'Red Rose'}}>Season Stats</h3>
    <Row className="text-center">
  
        <Col xs={12} md={6}>
          <PieChart data={data}
                title={"Rebounds"}
                label1={"Offensive"}
                label2={"Defensive"}
                width={200}
                height={200}
                innerRadius={60}
                outerRadius={100}/>
                
        </Col>
        <Col xs={12} md={6}>
          <PieChart data={dataTwoPoints}
              title={"Two Pointers"}
              width={200}
              height={200}
              innerRadius={60}
              outerRadius={100}
              label1={"Made"}
              label2={"Missed"}
              />   
        </Col>
      </Row>
      <Row className="text-center">
        <Col xs={12} md={6}>
          <PieChart data={dataThreePoints}
              title={"Three Pointers"}
              width={200}
              height={200}
              innerRadius={60}
              outerRadius={100}
              label1={"Made"}
              label2={"Missed"}/>
        </Col>
        <Col xs={12} md={6}>
          <PieChart data={dataGeneralPlay}
              title={"General Play"}
              width={200}
              height={200}
              innerRadius={60}
              outerRadius={100}
              label1={"Assists"}
              label2={"Steals"}
              label3={"Turnovers"}
              label4={"Fouls"}/>
        </Col>
      </Row>
  </Tab>
  <Tab eventKey="shotchart" title="Shots">
  <h3 className="mt-3 mb-3" style={{fontFamily: 'Red Rose'}}>Shot Tracking</h3>
    <Row>
      <Col xs={12} md={6}><img className="mt-3" alt="halfcourt" src={court2}/></Col>
      <Col xs={12} md={6}>
      <Table className="mt-3" striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th>Area</th>
            <th>Shot Made</th>
            <th>Shot Missed</th>
            {/* <th>%</th> */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area1Made,0)}</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area1Missed,0)}</td>
            {/* <td>{stats.reduce((acc, stat) => acc + stat.area1Made,0) / (stats.reduce((acc, stat) => acc + stat.area1Made,0) + stats.reduce((acc, stat) => acc + stat.area1Missed,0)) * 100}</td> */}
          </tr>
          <tr>
            <td>2</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area2Made,0)}</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area2Missed,0)}</td>
            {/* <td>{stats.reduce((acc, stat) => acc + stat.area2Made,0) / (stats.reduce((acc, stat) => acc + stat.area2Made,0) + stats.reduce((acc, stat) => acc + stat.area2Missed,0)) * 100}</td> */}
          </tr>
          <tr>
            <td>3</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area3Made,0)}</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area3Missed,0)}</td>
            {/* <td>{stats.reduce((acc, stat) => acc + stat.area3Made,0) / (stats.reduce((acc, stat) => acc + stat.area3Made,0) + stats.reduce((acc, stat) => acc + stat.area3Missed,0)) * 100}</td> */}
          </tr>     
          <tr>
            <td>4</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area4Made,0)}</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area4Missed,0)}</td>
            {/* <td>{stats.reduce((acc, stat) => acc + stat.area4Made,0) / (stats.reduce((acc, stat) => acc + stat.area4Made,0) + stats.reduce((acc, stat) => acc + stat.area4Missed,0)) * 100}</td> */}
          </tr>   
          <tr>
            <td>5</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area5Made,0)}</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area5Missed,0)}</td>
            {/* <td>{stats.reduce((acc, stat) => acc + stat.area5Made,0) / (stats.reduce((acc, stat) => acc + stat.area5Made,0) + stats.reduce((acc, stat) => acc + stat.area5Missed,0)) * 100}</td> */}
          </tr>                      
          <tr>
            <td>6</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area6Made,0)}</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area6Missed,0)}</td>
            {/* <td>{stats.reduce((acc, stat) => acc + stat.area6Made,0) / (stats.reduce((acc, stat) => acc + stat.area6Made,0) + stats.reduce((acc, stat) => acc + stat.area6Missed,0)) * 100}</td> */}
          </tr>          
          <tr>
            <td>7</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area7Made,0)}</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area7Missed,0)}</td>
            {/* <td>{stats.reduce((acc, stat) => acc + stat.area7Made,0) / (stats.reduce((acc, stat) => acc + stat.area7Made,0) + stats.reduce((acc, stat) => acc + stat.area7Missed,0)) * 100}</td> */}
          </tr>     
          <tr>
            <td>8</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area8Made,0)}</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area8Missed,0)}</td>
            {/* <td>{stats.reduce((acc, stat) => acc + stat.area8Made,0) / (stats.reduce((acc, stat) => acc + stat.area8Made,0) + stats.reduce((acc, stat) => acc + stat.area8Missed,0)) * 100}</td> */}
          </tr>               
          <tr>
            <td>9</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area9Made,0)}</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area9Missed,0)}</td>
            {/* <td>{stats.reduce((acc, stat) => acc + stat.area9Made,0) / (stats.reduce((acc, stat) => acc + stat.area9Made,0) + stats.reduce((acc, stat) => acc + stat.area9Missed,0)) * 100}</td> */}
          </tr>          
          <tr>
            <td>10</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area10Made,0)}</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area10Missed,0)}</td>
            {/* <td>{stats.reduce((acc, stat) => acc + stat.area10Made,0) / (stats.reduce((acc, stat) => acc + stat.area10Made,0) + stats.reduce((acc, stat) => acc + stat.area10Missed,0)) * 100}</td> */}
          </tr>     
          <tr>
            <td>11</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area11Made,0)}</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area11Missed,0)}</td>
            {/* <td>{stats.reduce((acc, stat) => acc + stat.area11Made,0) / (stats.reduce((acc, stat) => acc + stat.area11Made,0) + stats.reduce((acc, stat) => acc + stat.area11Missed,0)) * 100}</td> */}
          </tr>
          <tr>
            <td>12</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area12Made,0)}</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area12Missed,0)}</td>
            {/* <td>{stats.reduce((acc, stat) => acc + stat.area12Made,0) / (stats.reduce((acc, stat) => acc + stat.area12Made,0) + stats.reduce((acc, stat) => acc + stat.area12Missed,0)) * 100}</td> */}
          </tr>
          <tr>
            <td>13</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area13Made,0)}</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area13Missed,0)}</td>
            {/* <td>{stats.reduce((acc, stat) => acc + stat.area13Made,0) / (stats.reduce((acc, stat) => acc + stat.area13Made,0) + stats.reduce((acc, stat) => acc + stat.area13Missed,0)) * 100}</td> */}
          </tr>   
          <tr>
            <td>14</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area14Made,0)}</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area14Missed,0)}</td>
            {/* <td>{stats.reduce((acc, stat) => acc + stat.area14Made,0) / (stats.reduce((acc, stat) => acc + stat.area14Made,0) + stats.reduce((acc, stat) => acc + stat.area14Missed,0)) * 100}</td> */}
          </tr>         
          <tr>
            <td>15</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area15Made,0)}</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area15Missed,0)}</td>
            {/* <td>{stats.reduce((acc, stat) => acc + stat.area14Made,0) / (stats.reduce((acc, stat) => acc + stat.area14Made,0) + stats.reduce((acc, stat) => acc + stat.area14Missed,0)) * 100}</td> */}
          </tr>  
          <tr>
            <td>16</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area16Made,0)}</td>
            <td>{stats.reduce((acc, stat) => acc + stat.area16Missed,0)}</td>
            {/* <td>{stats.reduce((acc, stat) => acc + stat.area14Made,0) / (stats.reduce((acc, stat) => acc + stat.area14Made,0) + stats.reduce((acc, stat) => acc + stat.area14Missed,0)) * 100}</td> */}
          </tr>                                           
        </tbody>
    </Table></Col>
    </Row>
    
  </Tab>
</Tabs>
      
      <Footer/>
      </>
    );
  }

export default Display;