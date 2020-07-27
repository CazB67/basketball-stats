import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

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

let group2;

  useEffect(
    () => {
      const data = createPie(props.data);
      const group = d3.select(ref.current);

      group2 = group;
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
        .on('mouseout', onMouseOut)

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
        .on('mouseout', onMouseOut)
        
      
        const text2 = groupWithUpdate
        .append("text")
        ;
        text2
        .text("hi")
        .style("fill", "black")
        .style("font-size", 12)
        .attr('class', 'middletext')
        .style('text-anchor', 'middle')
        .style('visibility', 'hidden')

        function onMouseOver(d, i) {
          group2
            .attr('stroke-width', 2)
          switch (i) {
              case 0:
                group2.select('.middletext').text(props.label1)
                group2.select('.middletext').style('visibility', 'visible')
                  break;
              case 1:
                group2.select('.middletext').text(props.label2)
                group2.select('.middletext').style('visibility', 'visible')
                  break;
              case 2: 
              group2.select('.middletext').text(props.label3)
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
    </>
  );
};

export default PieChart;