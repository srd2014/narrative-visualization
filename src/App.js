import './App.css';
import CourtChart from './charts/CourtChart';
import TwoPtThreePtChart from './charts/ThreePointVsTwoPointChart';
import PositionBubbleChart from './charts/PositionBubbleChart';
import { Divider, Box } from '@material-ui/core';
import CourtChartText from './text/CourtChartText';
import PositionBubbleChartText from './text/PositionBubbleChartText';
import ThreePointVsTwoPointChartText from './text/ThreePointVsTwoPointChartText';

function App() {

  return (
    <Box ml={30} mr={30}>
        <div className="App">
          <CourtChartText/>
          <CourtChart width={600} height={300} />
          <Divider />
          <br/>
          <ThreePointVsTwoPointChartText/>
          <TwoPtThreePtChart />
          <Divider />
          <br/>
          <PositionBubbleChartText/>
          <PositionBubbleChart field="3PA"/>
        </div>
    </Box>
  );
}

export default App;