import React from 'react';

import Timer from './components/Timer';
import DataTable from './components/DataTable';
import IndicatorTable from './components/Indicators/IndicatorTable';
import GraphSelector from './components/Graphs/GraphSelector';
import CurrentStatus from './components/MissionStatus/CurrentStatus';

// import * as Comlink from 'comlink';
// import Worker from './path/to/worker/file.worker.js';

import './styles/DataWindow.css'

class DataWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mission_start: sessionStorage.getItem("DataWindowMissionStart") === "true",
      launch_start: sessionStorage.getItem("DataWindowLaunchStart") === "true",
      current_data: {
        This: 0,
        is: 0,
        Some: 0,
        Data: 0,
        Another: 0
      },
      current_indicators: {
        packetsSent: { name: "Packets Sent", data: 0, },
        packetsRecieved: { name: "Packets Recieved", data: 0, },
        QDM: { name: "QDM", data: false, },
        Ignition: { name: "Ignition", data: false, },
        GSRadio: { name: "GS Radio", data: false, },
        PlatformStability: { name: "Platform Stability", data: false, },
        PlatformRadio: { name: "Platform Radio", data: false, },

      },
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        current_data: {
          This: (1000 - 1) * Math.random() + 1, // random from 1 to 1000
          is: Math.random(),
          Some: Math.random(),
          Data: Math.random(),
          Another: Math.random(),
        }
      })

    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const data = this.state.current_data;
    return (
      <div id='container'>
        <div id={'leftPannel'}>
          <Timer timer_name="Mission Timer" tick={this.state.mission_start} />
          <Timer timer_name="Launch Timer" tick={this.state.launch_start} />
          <button onClick={() => {
            if (this.state.mission_start === true && this.state.launch_start === false) {
              // Needs to be saved as a string, bool not recognized
              sessionStorage.setItem("DataWindowLaunchStart", "true");
              this.setState({ launch_start: true });
            }
          }}>Start Launch</button>
          <DataTable
            data={data}
          />
        </div>

        <div id='rightPannel'>
          <CurrentStatus
            onMissionStart={() => {
              // Needs to be saved as a string, bool not recognized
              sessionStorage.setItem("DataWindowMissionStart", "true");
              this.setState({ mission_start: true });
            }}
          />
          <IndicatorTable
            indicators={this.state.current_indicators}
          />
          <button onClick={() => alert("¯\\_(ツ)_/¯")}>Stabilization</button>
        </div>

        <div id='bottomPannel'>
          <GraphSelector data={data} />
        </div>
      </div >
    );
  }
}

export default DataWindow;
