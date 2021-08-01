import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';
import { annotation, annotationCalloutCircle } from "d3-svg-annotation";

const rawData = require("../data/nba_historical_data.json");

/*

  Annotations
  - Highlight first season with 3 pt shooting
  - Highlight slow growth of 3 point shot
  - Highlight increase in attempts around 2010
  - Highlight decrease in volume of 3 pt shooting


*/
const buildDataSet = (fieldName) => {
  let results = [];
  rawData.forEach(d => {
    results.push({
      date: d.Season.substring(0, 4),
      value: d[fieldName]
    })
  })
  return {
    name: fieldName,
    values: results
  }
}

const data = [
  buildDataSet("2P"),
  buildDataSet("2PA"),
  buildDataSet("3P"),
  buildDataSet("3PA")
]

console.log(data)


var width = 1000;
var height = 400;
var margin = 50;
var duration = 250;

var lineOpacity = "0.25";
var lineOpacityHover = "0.85";
var otherLinesOpacityHover = "0.1";
var lineStroke = "1.5px";
var lineStrokeHover = "2.5px";

var circleOpacity = "0.85";
var circleOpacityOnLineHover = "0.25";
var circleRadius = 3;
var circleRadiusHover = 6;

function TwoPtThreePtChart() {
  const ref2 = useRef();

  useEffect(() => {
    var parseDate = d3.timeParse("%Y");
    data.forEach(function (d) {
      d.values.forEach(function (d) {
        d.date = parseDate(d.date);
      });
    });

    var xScale = d3
      .scaleTime()
      .domain(d3.extent(data[0].values, d => d.date))
      .range([0, width - margin]);

    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data[1].values, d => d.value)])
      .range([height - margin, 0]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3
      .select(ref2.current)
      .attr("width", width + margin + "px")
      .attr("height", height + margin + "px")
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);

    var line = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value));

    let lines = svg.append("g").attr("class", "lines");

    lines
      .selectAll(".line-group")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "line-group")
      .append("path")
      .attr("class", "line")
      .attr("d", d => line(d.values))
      .style("stroke", (d, i) => color(i))
      .style("opacity", lineOpacity)
      .on("mouseover", function (e, d) {
        d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
        d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
        d3.select(this)
          .style("opacity", lineOpacityHover)
          .style("stroke-width", lineStrokeHover)
          .style("cursor", "pointer");
      })
      .on("mouseout", function (d) {
        d3.selectAll(".line").style("opacity", lineOpacity);
        d3.selectAll(".circle").style("opacity", circleOpacity);
        d3.select(this)
          .style("stroke-width", lineStroke)
          .style("cursor", "none");
      });

    lines
      .selectAll("circle-group")
      .data(data)
      .enter()
      .append("g")
      .style("fill", (d, i) => color(i))
      .selectAll("circle")
      .data(d => d.values)
      .enter()
      .append("g")
      .attr("class", "circle")
      .on("mouseover", function (e, d) {
        d3.select(this)
          .style("cursor", "pointer")
          .append("text")
          .attr("class", "text")
          .text(`${d.value}`)
          .attr("x", d => xScale(d.date) + 5)
          .attr("y", d => yScale(d.value) - 10);
      })
      .on("mouseout", function (e, d) {
        d3.select(this)
          .style("cursor", "none")
          .transition()
          .duration(5)
          .selectAll(".text")
          .remove();
      })
      .append("circle")
      .attr("cx", d => xScale(d.date))
      .attr("cy", d => yScale(d.value))
      .attr("r", circleRadius)
      .style("opacity", circleOpacity)
      .on("mouseover", function (d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr("r", circleRadiusHover);
      })
      .on("mouseout", function (d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr("r", circleRadius);
      });

    var xAxis = d3.axisBottom(xScale).ticks(5);
    var yAxis = d3.axisLeft(yScale).ticks(5);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(xAxis)
      .append("text")
      .attr("y", 15)
      .attr("fill", "#000")
      .text("Season start [yr]")

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#000")
      .text("Total values");


      const annotations = [
        {
          note: {
            label: "Magic Johnson and Larry Bird were NBA rookies in the 1979 season",
            title: "3-pt shot introduced to NBA"
          },
          type: annotationCalloutCircle,
          subject: {
            radius: 3,         
            radiusPadding: 0   
          },
          color: ["#00429d"],
          x: 425,
          y: 347,
          dy: -40,
          dx: -40
        },
        {
          note: {
            label: "From 1979 onwards, the 3-pt shot volume has steadily risen while the 2 pointer is falling out of favor",
            title: "2-pt shot volume"
          },
          type: annotationCalloutCircle,
          subject: {
            radius: 30,         
            radiusPadding: 0   
          },
          color: ["#00429d"],
          x: 425,
          y: 50,
          dy: -15,
          dx: 40
        },
        {
          note: {
            label: "From 2010, hybrid big men (PF, C) started to expand out of the block. We see 3-pt attempts increasing at a higher clip starting around 2010.",
            title: "Rise of shooting big men"
          },
          type: annotationCalloutCircle,
          subject: {
            radius: 30,         
            radiusPadding: 0   
          },
          color: ["#00429d"],
          x: 800,
          y: 290,
          dy: -200,
          dx: 75
        }
      ]
      const makeAnnotations =
        annotation()
          .annotations(annotations);
  
      svg
        .append("g")
        .style("font-size", 10)
        .call(makeAnnotations)
  }, [height, width]);




  return (
    <div>
      <svg ref={ref2}>
      </svg>
    </div>
  )

}

export default TwoPtThreePtChart;