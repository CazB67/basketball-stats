import React, { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import data from './data'
import styled, { createGlobalStyle } from 'styled-components'

/**
 * Constants
 */
const width = 1000
const height = 600
const radius = Math.min(width, height) / 2
const black = '#333333'
const title = 'Los Angeles Lakers Scoring 2018-19'

/**
 * D3 Helpers
 */

// total points
var total = d3.sum(data, d => d.points)

// lakers colors
var lakersColors = d3
  .scaleLinear()
  .domain([0, 1, 2, 3])
  .range(['#7E1DAF', '#C08BDA', '#FEEBBD', '#FDBB21'])

// pie transformation
var pie = d3
  .pie()
  .sort((a, b) => {
    return a.name.length - b.name.length
  })
  .value(d => d.points)(data)

// inner arc used for pie chart
var arc = d3
  .arc()
  .outerRadius(radius * 0.6)
  .innerRadius(radius * 0.4)

// outer arc used for labels
var outerArc = d3
  .arc()
  .outerRadius(radius * 0.9)
  .innerRadius(radius * 0.9)

// midAngle helper function
function getMidAngle(d) {
  return d.startAngle + (d.endAngle - d.startAngle) / 2
}
/**
 * Global Style Sheet
 */
export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway:400,600&display=swap');

body {
  font-family: 'Raleway', Arial, Helvetica, sans-serif;
  color: ${black};
  padding: 0;
  margin: 0;
}
`

/**
 * Styled Components
 */
export const Container = styled.div`
  display: grid;
  grid-template-rows: 30px 1fr;
  align-items: center;
  user-select: none;
  .title {
    font-size: 25px;
    font-weight: 600;
    padding-left: 20px;
  }
`

export const Visualization = styled.div`
  justify-self: center;
  width: ${width}px;
  height: ${height}px;
  .slice {
    transition: transform 0.5s ease-in;
  }
  .label {
    font-size: 12px;
    font-weight: 600;
  }
  .total {
    font-size: 20px;
    font-weight: 600;
  }
`

export const Tooltip = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${radius * 0.7}px;
  height: ${radius * 0.7}px;
  display: grid;
  align-items: center;
  justify-items: center;
  border-radius: 50%;
  margin-top: 10px;
  font-size: 12px;
  background: #ffffff;
  .label {
    font-weight: 600;
  }
`

export default () => {
  const [player, setPlayer] = useState(null)

  const visualization = useRef(null)

  useEffect(() => {
    var svg = d3
      .select(visualization.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    svg
      .selectAll('slices')
      .data(pie)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => lakersColors(i % 4))
      .attr('stroke', black)
      .attr('stroke-width', 1)
      .attr('class', 'slice')
      .on('mouseover', onMouseOver)
      .on('mouseout', onMouseOut)

    svg
      .selectAll('lines')
      .data(pie)
      .enter()
      .append('polyline')
      .attr('stroke', black)
      .attr('stroke-width', 1)
      .style('fill', 'none')
      .attr('points', d => {
        var posA = arc.centroid(d)
        var posB = outerArc.centroid(d)
        var posC = outerArc.centroid(d)
        var midAngle = getMidAngle(d)
        posC[0] = radius * 0.95 * (midAngle < Math.PI ? 1 : -1)
        return [posA, posB, posC]
      })

    svg
      .selectAll('labels')
      .data(pie)
      .enter()
      .append('text')
      .text(d => {
        var midAngle = getMidAngle(d)
        return midAngle < Math.PI
          ? `${d.data.name} - ${d.data.points}`
          : `${d.data.points} - ${d.data.name}`
      })
      .attr('class', 'label')
      .attr('transform', d => {
        var pos = outerArc.centroid(d)
        var midAngle = getMidAngle(d)
        pos[0] = radius * 0.99 * (midAngle < Math.PI ? 1 : -1)
        return `translate(${pos})`
      })
      .style('text-anchor', d => {
        var midAngle = getMidAngle(d)
        return midAngle < Math.PI ? 'start' : 'end'
      })

    function showTotal() {
      svg
        .append('text')
        .text(`Total: ${total}`)
        .attr('class', 'total')
        .style('text-anchor', 'middle')
    }

    function hideTotal() {
      svg.selectAll('.total').remove()
    }

    function onMouseOver(d, i) {
      hideTotal()
      setPlayer(d.data)
      d3.select(this)
        .attr('fill', d3.rgb(lakersColors(i % 4)).brighter(0.5))
        .attr('stroke-width', 2)
        .attr('transform', 'scale(1.1)')
    }

    function onMouseOut(d, i) {
      setPlayer(null)
      showTotal()
      d3.select(this)
        .attr('fill', lakersColors(i % 4))
        .attr('stroke-width', 1)
        .attr('transform', 'scale(1)')
    }

    showTotal()
  }, [])

  return (
    <>
      <GlobalStyle />
      <Container>
        <div className='title'>{title}</div>
        <Visualization ref={visualization} />
        {player ? (
          <Tooltip>
            <div>
              <span className='label'>Name: </span>
              <span>{player.name}</span>
              <br />
              <span className='label'>Points: </span>
              <span>{player.points}</span>
              <br />
              <span className='label'>Percent: </span>
              <span>{Math.round((player.points / total) * 1000) / 10}%</span>
            </div>
          </Tooltip>
        ) : null}
      </Container>
    </>
  )
}