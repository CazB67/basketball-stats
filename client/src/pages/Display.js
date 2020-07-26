import React, { useState, useEffect } from "react";
import {DataTable, TableHeader, TableWrapper} from "../components/Table";
import API from "../utils/API";
import GlobalStore from "../utils/context/GlobalStore";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import{ StatsNav, NavLink} from "../components/Navbar";
import PieChart from "../components/PieChart";
import * as d3 from "d3";
import { Col, Row } from 'react-bootstrap';

function Display() {
  const [rebounds, setRebounds] = useState([]);
  const [data, setData] = useState([]);

  const [twoPoints, setTwoPoints] = useState([])
  const [dataTwoPoints, setDataTwoPoints] = useState([])

  const [threePoints, setThreePoints] = useState([])
  const [dataThreePoints, setDataThreePoints] = useState([])

  const [generalPlay, setGeneralPlay] = useState([])
  const [dataGeneralPlay, setDataGeneralPlay] = useState([])


  const [stats, setStats] = useState([]);
  
  const generateReboundData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: rebounds[index]
      //value: value === null || value === undefined ? Math.random() * 100 : value
    }));

    const generateTwoPointData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: twoPoints[index]
      //value: value === null || value === undefined ? Math.random() * 100 : value
    }));

    const generateThreePointData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: value === null || value === undefined ? threePoints[index] : value
      //value: value === null || value === undefined ? Math.random() * 100 : value
    }));

    const generatePlayData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: generalPlay[index]
      //value: value === null || value === undefined ? Math.random() * 100 : value
    }));

    useEffect(
      () => {
        setData(generateReboundData());
      },
      [!data]
    );
    // Chain the useEffects

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
      console.log(rebounds.length);
      console.log(twoPoints[0] + "---------------------------")
    },[rebounds, twoPoints, threePoints, generalPlay]);

    

  const store = GlobalStore.useGlobalContext()
  const history = useHistory()
  //console.log(store.currentPage + "----------")
  useEffect(() => {
      axios.get('/current-user', {
          withCredentials: true,
      })
          .then((response) => {
            console.log(response.data.data + "-----");
              store.auth.dispatchAuth({
                  type: 'set-user',
                  payload: response.data.data
              })
          }).catch((err) => {
              if(err.response.status === 401){
                //store.currentPage.setCurrentPage("/")
                  return history.push('/')
              }
              console.log("Error " + {err});
          })
  }, [])

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
  
    return (
      <>
      <StatsNav>
        <NavLink/>
      </StatsNav>
     <TableWrapper>
      <TableHeader/>
      {stats.map(stat => (
      <DataTable
        key={stat._id}
        date={stat.createdAt.substring(0,10)}
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
        courttime={stat.courtTime}
      />
      ))}
     </TableWrapper>
     <Row className="text-center">
       <Col xs={12} md={6}>
     <PieChart data={data}
          title={"Rebounds"}
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
          outerRadius={100}/>
          </Col>
          </Row>
          <Row className="text-center">
       <Col xs={12} md={6}>
     <PieChart data={dataThreePoints}
          title={"Three Pointers"}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}/>
          </Col>
          <Col xs={12} md={6}>
          <PieChart data={dataGeneralPlay}
           title={"General Play"}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}/>
          </Col>
          </Row>
      </>
    );
  }

export default Display;