import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {DataTable, TableHeader, TableWrapper} from "../components/Table";
import API from "../utils/API";


function Display() {
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
     <Navbar/>
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
     <Footer/>
      </>
    );
  }

export default Display;