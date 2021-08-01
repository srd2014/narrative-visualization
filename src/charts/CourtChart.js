// BarChart.js
import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';
import { annotation, annotationCalloutCircle } from "d3-svg-annotation";

function CourtChart({ width, height }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current)
      .attr("width", width)
      .attr("height", height)
  }, []);

  useEffect(() => {
    draw();
  }, []);

  const draw = () => {
    const svg = d3.select(ref.current);

    const arcGenerator = (N) => d3.arc()
      .outerRadius(N * 7.5)
      .innerRadius(N * 7.5 - 2)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    const nbaArc = svg.append("path")
      .attr("transform", "translate(300,275)")
      .attr("d", arcGenerator(23.75)())
      .attr("fill", "#00429d")

    const wnbaArc = svg.append("path")
      .attr("transform", "translate(300,275)")
      .attr("d", arcGenerator(21.65)())
      .attr("fill", "#2975b2");

    const ncaaArc = svg.append("path")
      .attr("transform", "translate(300,275)")
      .attr("d", arcGenerator(20.75)())
      .attr("fill", "#51a8c6");

    const highSchoolArc = svg.append("path")
      .attr("transform", "translate(300,275)")
      .attr("d", arcGenerator(19.75)())
      .attr("fill", "#7adcdc");

    // Features of the annotation
    const annotations = [
      {
        note: {
          label: "23.75 ft",
          title: "NBA 3-pt line"
        },
        type: annotationCalloutCircle,
        subject: {
          radius: 3,         // circle radius
          radiusPadding: 0   // white space around circle befor connector
        },
        color: ["#00429d"],
        x: 212,
        y: 120,
        dy: -40,
        dx: -40
      },
      {
        note: {
          label: "21.65 ft",
          title: "WNBA 3-pt line"
        },
        type: annotationCalloutCircle,
        subject: {
          radius: 3,         // circle radius
          radiusPadding: 0   // white space around circle befor connector
        },
        color: ["#2975b2"],
        x: 197,
        y: 150,
        dy: -5,
        dx: -60
      },
      {
        note: {
          label: "20.75 ft",
          title: "NCAA 3-pt line"
        },
        type: annotationCalloutCircle,
        subject: {
          radius: 3,         // circle radius
          radiusPadding: 0   // white space around circle befor connector
        },
        color: ["#51a8c6"],
        x: 375,
        y: 140,
        dy: -60,
        dx: 70
      },
      {
        note: {
          label: "19.75 ft",
          title: "HS 3-pt line"
        },
        type: annotationCalloutCircle,
        subject: {
          radius: 3,         // circle radius
          radiusPadding: 0   // white space around circle befor connector
        },
        color: ["#51a8c6"],
        x: 390,
        y: 159,
        dy: -25,
        dx: 80
      },
    ]

    // Add annotation to the chart
    const makeAnnotations =
      annotation()
        .annotations(annotations);

    d3.select("svg")
      .append("g")
      .call(makeAnnotations)
  }


  return (
    <div className="chart">
      <svg ref={ref}>
      </svg>
    </div>

  )

}

export default CourtChart;