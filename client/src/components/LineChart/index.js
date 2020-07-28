import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

function LineChart(props) {

  

 
    return (
      <MDBContainer>
        <h3 className="mt-5">Per Game Stats</h3>
        <Line data={props.dataLine} options={{ responsive: true }} />
      </MDBContainer>
    );
  }


export default LineChart;