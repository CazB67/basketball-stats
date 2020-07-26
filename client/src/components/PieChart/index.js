import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Alert } from 'react-bootstrap';

const PieChart = props => {
  const ref = useRef(null);

  const createPie = d3
    .pie()
    .value(d => d.value)
    .sort(null);

  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);

  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const format = d3.format(".2f");

  useEffect(
    () => {
      const data = createPie(props.data);
      const group = d3.select(ref.current);
      const groupWithData = group.selectAll("g.arc").data(data);
      groupWithData.exit().remove();
      const groupWithUpdate = groupWithData
        .enter()
        .append("g")
        .attr("class", "arc");
        
      const path = groupWithUpdate
        .append("path")
        .merge(groupWithData.select("path.arc"));

      path
        .attr("class", "arc")
        .attr("d", createArc)
        .attr("fill", (d, i) => colors(i))
        .on('mouseover', onMouseOver)

      const text = groupWithUpdate
        .append("text")
        .merge(groupWithData.select("text"));

      text
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("transform", d => `translate(${createArc.centroid(d)})`)
        .style("fill", "white")
        .style("font-size", 10)
        .text(d => format(d.value) === "NaN" ? "":  format(d.value))
        .on('mouseover', onMouseOver)
        ;
    },
    [props.data]
  );

  function onMouseOver(d, i) {
    switch (i) {
        case 0:
            alert(props.label1)
            break;
        case 1:
            alert(props.label2)
            break;
        case 2: 
            alert(props.label3)
            break;
        default:
            break;
    }
  }
  return (
      <>
      <h4 className="mt-3">{props.title}</h4>
      <svg className="mb-3" width={props.width} height={props.height}>
        <g
          ref={ref}
          transform={`translate(${props.outerRadius} ${props.outerRadius})`}
        />
      </svg>
      <Alert  className="d-none" variant="dark">
      {props.label1}
      </Alert>
    </>
  );
};

export default PieChart;