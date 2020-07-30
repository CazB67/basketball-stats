import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

function BarChart(props) {

    return (
      <MDBContainer>
        <Bar data={props.dataBar} options={props.options} />
      </MDBContainer>
    );
  }

export default BarChart;