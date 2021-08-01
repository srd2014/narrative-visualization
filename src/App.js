import React, { useEffect, useState } from 'react';
import './App.css';
import CourtChart from './charts/CourtChart';
import TwoPtThreePtChart from './charts/ThreePointVsTwoPointChart';
import PositionBubbleChart from './charts/PositionBubbleChart';
import { Divider, Box } from '@material-ui/core';
import BirthplaceText from './content/Birthplace';
const datas = [
  [10, 30, 40, 20],
  [10, 40, 30, 20, 50, 10],
  [60, 30, 40, 20, 30]
]
var i = 0;

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    changeData();
  }, []);

  const changeData = () => {
    setData(datas[i++]);
    if (i === datas.length) i = 0;
  }


  return (
    <Box ml={15} mr={15}>
      <div className="App">
        <h2>Birth of the 3-point shot</h2>
        <div style={{textAlign: 'left'}}>
            <p>
              The three point shot has evolved over the years. It started before the NBA in the ABL (American Basketball League)
              which survived only for 1.5 seasons before folding. The ABA (American Basketball Association) was conceived by big-man
              George Mikan -- he cheekily called it the "home run" of basketball bringing fans out of their seats. After the NBA and ABA
              merged in 1976 didn't include the 3 point, but was officially included as part of th8e 1979-1980 season.
              <br/><br/>
              From then on, it was included in all variations of the sport at different levels - high school, college, WNBA, and
              international play. At this point, it's less of a spectacle and more of a standard part of any offense. It changes the 
              game as players are not incentivized to shoot close to the basket (for layups and dunks) but attempt to make 1.5x 
              as many points by hitting shots outside the arc. 
            </p>
        </div>
        <CourtChart width={600} height={300} />
        <Divider />
        <h2>The dominance and steady decline of the 2-point shot</h2>
        <div style={{textAlign: 'left'}}>
          <p>
            One of the most fascinating aspects of the game is the continuous change in offense. As the NBA has evolved, we find
            that not just guards are taking 3-pointers -- power forwards and centers are expanding their range. Centers have gone from
            taking ~90 3PA in 1980 to over 5400 in the 2020 season. The power forward has gone from taking ~250 3PA in 1980
            to over 13,000 3PA in 2020 -- a 50x multiple. 
          </p>
        </div>
        <TwoPtThreePtChart />
        <Divider />
        <h2>The modern game</h2>
        <h3>Three Point Attempts - Positional Breakdown</h3>
        <div style={{textAlign: 'left'}}>
          <p>
            One of the most fascinating aspects of the game is the continuous change in offense. As the NBA has evolved, we find
            that not just guards are taking 3-pointers -- power forwards and centers are expanding their range. Centers have gone from
            taking ~90 3PA in 1980 to over 5400 in the 2020 season. The power forward has gone from taking ~250 3PA in 1980
            to over 13,000 3PA in 2020 -- a 50x multiple. 
          </p>
          <p>
            As the big man has started to migrate outwards, guards have begun to expand their range as well. Not only are PGs and SGs shooting
            more from 3 -- they have expanded even further out. Half-court usage by year is another interesting trend to follow in the coming years.
          </p>
          <p>
            The dynamics of the game start to change when the 5 players on the court can play from any position. It allows 
            for better spacing and more motion-oriented offense -- you don't have a 7 footer sitting in the lane clogging the paint!
          </p>
          <br/>
          <p><strong>
              Explore the 3 point attempts by position over the years. Hover over the circles for the raw values. 
              </strong></p>
        </div>
        <PositionBubbleChart field="3PA"/>
      </div>
    </Box>
  );
}

export default App;