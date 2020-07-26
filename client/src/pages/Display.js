import React, { useState, useEffect } from "react";
import {DataTable, TableHeader, TableWrapper} from "../components/Table";
import API from "../utils/API";
import GlobalStore from "../utils/context/GlobalStore";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import{ StatsNav, NavLink} from "../components/Navbar";
import PieChart from "../components/PieChart";
import * as d3 from "d3";

function Display() {
  const [rebounds, setRebounds] = useState([]);
  const [data, setData] = useState([]);
  const [stats, setStats] = useState([]);
  
  const generateData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: rebounds[index]
      //value: value === null || value === undefined ? Math.random() * 100 : value
    }));

    // Chain the useEffects

useEffect(() => {
  getSavedStats();
}, [])

useEffect(() => {
  setRebounds(getRebounds);
}, [stats])

  useEffect(() => {
      setData(generateData());
      console.log(rebounds.length);
    },[rebounds]);

    

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
        opponent={stat.opponent}
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
     <PieChart data={data}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}/>
      </>
    );
  }

export default Display;