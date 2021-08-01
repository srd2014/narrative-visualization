// BarChart.js
import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

/*
  Load all data
*/

const data = {
  1980: require("../data/1980_processed.json"),
  1985: require("../data/1985_processed.json"),
  1990: require("../data/1990_processed.json"),
  1995: require("../data/1995_processed.json"),
  2000: require("../data/2000_processed.json"),
  2005: require("../data/2005_processed.json"),
  2010: require("../data/2010_processed.json"),
  2015: require("../data/2015_processed.json"),
  2020: require("../data/2020_processed.json")
}

const width = 600;
const height = 600;
const strength = 1;

let maxRadius = 100

let extentCountFunc = (nodes, field) => {
  let concatData = []
  for (const seasonKey in data) {
    concatData = concatData.concat(data[seasonKey]);
  }
  return d3.extent(concatData, d => d[field]);
};

let xScaleFunc = (extentCount) => {
  return d3.scaleLinear()
  .domain(extentCount)
  .range([(width - maxRadius), maxRadius])
};

let yScaleFunc = (extentCount) => {
  return d3.scaleLinear()
  .domain(extentCount)
  .range([height - maxRadius, maxRadius])
};

let rScaleFunc = (extentCount) => {
  return d3.scaleSqrt()
  .domain(extentCount)
  .range([5, maxRadius])
}


function PositionBubbleChart({ field }) {
  const ref3 = useRef();

  useEffect(() => {

    const defaultData = data[1980];

    let nodes = defaultData

    var width = 600;
    var height = 600;
    var margin = 50
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var years = ["1980", "1985", "1990", "1995", "2000", "2005", "2010", "2015", "2020"]

    d3.select("#selectButton")
      .selectAll('myOptions')
      .data(years)
      .enter()
      .append('option')
      .text(function (d) { return d; })
      .attr("value", function (d) { return d; }) 
    
      d3.select("#selectButton").on("change", function (d) {
        var selectedYear = d3.select(this).property("value")
        update(selectedYear)
      });

    // Defaults 
    let extentCount = extentCountFunc(nodes, field);
    let xScale = xScaleFunc(extentCount);
    let yScale = yScaleFunc(extentCount);
    let rScale = rScaleFunc(extentCount);

    var svg = d3.select(ref3.current)
      .attr("width", width + margin + margin)
      .attr("height", height + margin + margin);

    let xLegendStart = 20; 
    let yLegendStart = 20;
    let yGap = 21;
    svg.append("circle").attr("cx",xLegendStart).attr("cy",yLegendStart).attr("r", 10).style("fill", "#FF7F50")
    svg.append("circle").attr("cx",xLegendStart).attr("cy",yLegendStart + yGap).attr("r", 10).style("fill", "#1F77B4")
    svg.append("circle").attr("cx",xLegendStart).attr("cy",yLegendStart + 2 * yGap).attr("r", 10).style("fill", "#2CA02C")
    svg.append("circle").attr("cx",xLegendStart).attr("cy",yLegendStart + 3 * yGap).attr("r", 10).style("fill", "#D62727")
    svg.append("circle").attr("cx",xLegendStart).attr("cy",yLegendStart + 4 * yGap).attr("r", 10).style("fill", "#9468BD")
    svg.append("text").attr("x", xLegendStart + 10).attr("y", yLegendStart).text("PG").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", xLegendStart + 10).attr("y", yLegendStart + yGap).text("SG").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", xLegendStart + 10).attr("y", yLegendStart + 2 * yGap).text("SF").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", xLegendStart + 10).attr("y", yLegendStart + 3 * yGap).text("PF").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", xLegendStart + 10).attr("y", yLegendStart + 4 * yGap).text("C").style("font-size", "15px").attr("alignment-baseline","middle")


    var g = svg.append("g")
      .attr("transform", "translate(" + 100 + "," + 100 + ")")  

    var simulation = d3.forceSimulation(nodes)
      .force("forceX", d3.forceX().strength(strength).x(d => xScale(d[field])))
      .force("forceY", d3.forceY().strength(strength).y(d => yScale(d[field])))
      .force('collision', d3.forceCollide(10).radius(d => rScale(d[field]) + 2))
      .on("tick", function (d) {
        node
          .attr("cx", function (d) { return d.x; })
          .attr("cy", function (d) { return d.y; })
      })
      .stop()

    for (var i = 0; i < 1200; i++) {
      simulation.tick()
    }

    var node = g.selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      })

    node.append("circle")
      .attr("r", d => rScale(d[field]))
      .style("fill", function (d, i) {
        return color(i);
      })
      .append("svg:title")
      .text(function(d) { return `${d.Pos}: ${d[field]}` });

    ///////////////////////////////////
    // Update when new year is selected
    ///////////////////////////////////

    function update(selectedYear) {
      let nodes = data[selectedYear];

      let extentCount = extentCountFunc(nodes, field);
      let xScale = xScaleFunc(extentCount);
      let yScale = yScaleFunc(extentCount);
      let rScale = rScaleFunc(extentCount);

      var simulation = d3.forceSimulation(nodes)
      .force("forceX", d3.forceX().strength(strength).x(d => xScale(d[field])))
      .force("forceY", d3.forceY().strength(strength).y(d => yScale(d[field])))
      .force('collision', d3.forceCollide(10).radius(d => rScale(d[field]) + 1))
      .on("tick", function (d) {
        node
          .attr("cx", function (d) { return d.x; })
          .attr("cy", function (d) { return d.y; })
      })
      .stop()

    for (var i = 0; i < 1200; i++) {
      simulation.tick()
    }

    node = svg
      .selectAll(".node")
      .data(nodes)
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      })
    
    node.append("circle")
      .attr("r", d => rScale(d[field]))
      .style("fill", function (d, i) {
        console.log(d, i)
        return color(i);
      })
      .append("svg:title")
      .text(function(d) { return `${d.Pos}: ${d[field]}` })

    svg.selectAll("circle")
    .style("opacity", 0.25)
    .transition()
    .duration(1000)
    .style("opacity", 1);
    node.exit().remove();
  }
  }, []);


  return (
    <div className="chart">
      <select id="selectButton"></select>
      <svg ref={ref3}>
      </svg>
    </div>

  )

}

export default PositionBubbleChart;