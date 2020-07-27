import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChart = props => {
  const ref = useRef(null);
  const width = 400
const height = 400
  const createPie = d3
    .pie()
    .value(d => d.value)
    .sort(null)
    
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius)
    .padAngle(.02)
  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const format = d3.format(".0f");

let group2;

  useEffect(
    () => {
      const data = createPie(props.data);
      const group = d3.select(ref.current)
      .attr('transform', `translate(${width / 2}, ${height / 2})`)
      group2 = group;
      const groupWithData = group.selectAll("g.arc").data(data);
      groupWithData.exit().remove();
      const groupWithUpdate = groupWithData
        .enter()
        .append("g")
        .attr("class", "arc");
        
      const path = groupWithUpdate
        .append("path")
        .merge(groupWithData.select("path.arc"))
        .on('mouseover', onMouseOver)
        .on('mouseout', onMouseOut)

      path
        .attr("class", "arc")
        .attr("d", createArc)
        .attr("fill", (d, i) => colors(i))
        

      const text = groupWithUpdate
        .append("text")
        .merge(groupWithData.select("text"));

      text
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("transform", d => `translate(${createArc.centroid(d)})`)
        .style("fill", "black")
        .style("font-size", 14)
        .text(d => format(d.value) === "NaN" ? "":  format(d.value))
        
        const text2 = groupWithUpdate
        .append("text")
        ;
        text2
        .text("hi")
        .style("fill", "black")
        .style("font-size", 14)
        .attr('class', 'middletext')
        .style('text-anchor', 'middle')
        .style('visibility', 'hidden')

        function onMouseOver(d, i) {
          d3.select(this)
            .attr('stroke-width', 1).attr('transform', 'scale(1.1)')
          switch (i) {
              case 0:
                d3.select('.middletext').text(props.label1)
                d3.select('.middletext').style('visibility', 'visible')
                  break;
              case 1:
                group2.select('.middletext').text(props.label2)
                group2.select('.middletext').style('visibility', 'visible')
                  break;
              case 2: 
              group2.select('.middletext').text(props.label3)
              group2.select('.middletext').style('visibility', 'visible')
                  break;
              case 3: 
              group2.select('.middletext').text(props.label4)
              group2.select('.middletext').style('visibility', 'visible')
                  break;
              default:
                  break;
          }
        }
    },
    [props.data]
  );

  function onMouseOut(d, i) {
    group2.select('.middletext').style('visibility', 'hidden')
    d3.select(this)
            .attr('stroke-width', 1).attr('transform', 'scale(1)')
  }

  return (
      <>
      <h4 className="mt-3">{props.title}</h4>
      <svg className="mb-3" width={width} height={height}>
        <g
          ref={ref}
          transform={`translate(${props.outerRadius} ${props.outerRadius})`}
        />
      </svg>
    </>
  );
};

export default PieChart;