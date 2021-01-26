import React from 'react';

import Timer from './components/Timer';
import DataTable from './components/DataTable';
import IndicatorTable from './components/Indicators/IndicatorTable';
import GraphSelector from './components/Graphs/GraphSelector';
import CurrentStatus from './components/MissionStatus/CurrentStatus';

// import * as Comlink from 'comlink';
// import Worker from './path/to/worker/file.worker.js';

import './styles/DataWindow.css';
import './styles/BasicElements.css';

class DataWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mission_start: sessionStorage.getItem("DataWindowMissionStart") === "true",
      launch_start: sessionStorage.getItem("DataWindowLaunchStart") === "true",
      current_data: {
        Altitude: 0,
        Longitude: 0,
        Latitude: 0,
        Gyro: {
          X: 0,
          Y: 0,
          Z: 0,
        },
        Temperature: 0,
        Acceleration: {
          X: 0,
          Y: {
            A: 0,
            B: 0,
          },
          Z: 0,
        },
      },
      current_indicators: [
        { name: "Packets Sent", data: 0, },
        { name: "Packets Recieved", data: 0, },
        { name: "QDM", data: false, },
        { name: "Ignition", data: false, },
        { name: "GS Radio", data: false, },
        { name: "Platform Stability", data: false, },
        { name: "Platform Radio", data: false, },
      ],
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        current_data: {
          Altitude: Math.random(),
          Longitude: Math.random(),
          Latitude: Math.random(),
          Gyro: {
            X: Math.random(),
            Y: Math.random(),
            Z: Math.random(),
          },
          Temperature: Math.random(),
          Acceleration: {
            X: Math.random(),
            Y: {
              A: Math.random(),
              B: Math.random(),
            },
            Z: Math.random(),
          }
        },
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const data = this.state.current_data;
    return (
      <div id='container'>
        <div id='leftPannel'>
          <div id='timerContainer'>
            <Timer timer_name="Mission Timer" tick={this.state.mission_start} />
            <Timer timer_name="Launch Timer" tick={this.state.launch_start} />
          </div>
          <CurrentStatus
            onMissionStart={() => {
              // Needs to be saved as a string, bool not recognized
              sessionStorage.setItem("DataWindowMissionStart", "true");
              this.setState({ mission_start: true });
            }}
          />

          <IndicatorTable
            indicators={this.state.current_indicators}
            cols={4}
          />
        </div>

        <div id='rightPannel'>
          <DataTable
            title="BALLOON DATA"
            data={data}
          />

          <div id="additionalControls">
            <button className="additionalControlButton" onClick={() => {
              if (this.state.mission_start === true && this.state.launch_start === false) {
                // This is just for testing the timer, button starts timer if mission is started
                // Does NOT check if verified or if mission is aborted
                this.setState({ launch_start: true });
              }
            }}>Start Launch</button>
            <button className="additionalControlButton" onClick={() => {
              alert("¯\\_(ツ)_/¯");
            }}>Stabilization</button>
          </div>

          <div id="logoPannel">
            <img src={process.env.PUBLIC_URL + '/img/orbital-logo.gif'} alt="Purdue Orbital" />
          </div>
        </div>

        <div id='graphPannel'>
          <GraphSelector data={data} />
        </div>
      </div >
    );
  }
}

export default DataWindow;
