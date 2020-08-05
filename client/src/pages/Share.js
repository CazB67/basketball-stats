import React, { useState, useEffect } from "react";
import{ StatsNav} from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router";
import API from "../utils/API";
import {Jumbotron, Container, Table } from 'react-bootstrap';

function Share() {
    let { id } = useParams();
    const [stats, setStats] = useState([]);

    function getGameStats() {
        API.getStat(id)
        .then(res => setStats(res.data))
        .catch(err => console.log(err));
    }

    useEffect(() => {
        getGameStats();
      })

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
   
    return (
      <>
      <StatsNav/>
      <Jumbotron fluid>
  <Container >
      <h1 className="text-center">{typeof(stats.createdAt) !== "undefined" ? stats.createdAt.substring(0,10).split("-").reverse().join("-") : "No Game"}</h1>
      <h3 className="mb-5 text-center">Against {typeof(stats.opponent) !== "undefined" ? stats.opponent.toUpperCase() : "No opponent"}</h3>
        <Table responsive="sm">
            <tbody >
            <tr>
                <td style={{fontWeight: "900"}} >Score</td>
                <td>{stats.finalScore}</td>
            </tr>
            <tr>
            <td style={{fontWeight: "900"}} >One Pointer Made</td>
                <td>{stats.onePointerMade}</td>
            </tr>
            <tr>
            <td style={{fontWeight: "900"}} >One Pointer Missed</td>
                <td>{stats.onePointerMissed}</td>
            </tr>
            <tr>
            <td style={{fontWeight: "900"}} >Two Pointer Made</td>
                <td>{stats.twoPointerMade}</td>
            </tr>
            <tr>
            <td style={{fontWeight: "900"}} >Two Pointer Missed</td>
                <td>{stats.twoPointerMissed}</td>
            </tr>
            <tr>
            <td style={{fontWeight: "900"}} >Three Pointer Made</td>
                <td>{stats.threePointerMade}</td>
            </tr>
            <tr>
            <td style={{fontWeight: "900"}} >Three Pointer Missed</td>
                <td>{stats.threePointerMissed}</td>
            </tr>
            <tr>
            <td style={{fontWeight: "900"}} >Defensive Rebound</td>
                <td>{stats.defRebound}</td>
            </tr>
            <tr>
            <td style={{fontWeight: "900"}} >Offensive Rebound</td>
                <td>{stats.offRebound}</td>
            </tr>
            <tr>
            <td style={{fontWeight: "900"}} >Steal</td>
                <td>{stats.steal}</td>
            </tr>
            <tr>
            <td style={{fontWeight: "900"}} >Assist</td>
                <td>{stats.assist}</td>
            </tr>
            <tr>
            <td style={{fontWeight: "900"}} >Foul</td>
                <td>{stats.foul}</td>
            </tr>
            <tr>
            <td style={{fontWeight: "900"}} >Turnover</td>
                <td>{stats.turnover}</td>
            </tr>
            <tr>
            <td style={{fontWeight: "900"}} >Time on Court</td>
                <td>{formatGameTime(stats.courtTime)}</td>
            </tr>
            </tbody>
        </Table>
  </Container>
</Jumbotron>
<Footer/>
      </>
    );
  }

export default Share;