import React, { useState, useEffect } from "react";
import {DataTable, TableHeader, TableWrapper} from "../components/Table";
import API from "../utils/API";
import GlobalStore from "../utils/context/GlobalStore";
import { useHistory } from "react-router-dom";
import axios from 'axios';

function Display() {
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

  const [stats, setStats] = useState([]);

  useEffect(() => {
    getSavedStats()
  }, [])

  function getSavedStats() {
    API.getSavedStats()
      .then(res => setStats(res.data))
      .catch(err => console.log(err));
  };
  
    return (
      <>
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
      </>
    );
  }

export default Display;