import React from "react";

function PositionBubbleChartText() {
  return (
  <React.Fragment>
        <h3><u>Part 3: The Positional Evolution of 3-point Shooting</u></h3>
        <div style={{textAlign: 'left'}}>
          <p>
            One of the most fascinating aspects of the game is the continuous change in offense. As the NBA has evolved, we find
            that not only guards are taking 3-pointers -- power forwards and centers are expanding their range. Centers have gone from
            taking ~90 3PA in 1980 to over 5400 in the 2020 season. The power forward has gone from taking ~250 3PA in 1980
            to over 13,000 3PA in 2020 -- a 50x multiple. 
          </p>
          <p>
            As the big man has started to migrate outwards, guards have begun to expand their range as well. Not only are PGs and SGs shooting
            more from 3 -- they have expanded their range even further out. Half-court usage by year is another interesting trend to follow in the coming years.
          </p>
          <p>
            The dynamics of the game start to change when the 5 players on the court can play from any position. It allows 
            for better spacing and more motion-oriented offense -- you don't have a 7 footer sitting in the lane clogging the paint!
          </p>
          <h5>Explore the # of 3 point attempts by position over the years -- see the dropdown below. Hover over the circles for the raw values.</h5>
        </div>
  </React.Fragment>
  )
}

export default PositionBubbleChartText;