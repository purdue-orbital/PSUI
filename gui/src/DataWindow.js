import React from 'react';

import StatusEnum from './utils/StatusEnum.js'

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
        "Altitude": 0,
        "Longitude": 0,
        "Latitude": 0,
        "Gyro X": 0,
        "Gyro Y": 0,
        "Gyro Z": 0,
        "Temperature": 0,
        "Acceleration X": 0,
        "Acceleration Y": 0,
        "Acceleration Z": 0,
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
    };

    // Currently reading mission status w/ a ref, but status 
    // could be moved here for unidirectional downward flow of props
    this.missionStatusControl = React.createRef();
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        current_data: {
          "Altitude": (1000 - 1) * Math.random() + 1, // random from 1 to 1000
          "Longitude": Math.random(),
          "Latitude": Math.random(),
          "Gyro X": Math.random(),
          "Gyro Y": Math.random(),
          "Gyro Z": Math.random(),
          "Temperature": Math.random(),
          "Acceleration X": Math.random(),
          "Acceleration Y": Math.random(),
          "Acceleration Z": Math.random(),
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
        <div id='leftPannel'>
          <div id='timerContainer'>
            <Timer timer_name="Mission Timer" tick={this.state.mission_start} />
            <Timer timer_name="Launch Timer" tick={this.state.launch_start} />
          </div>
          <CurrentStatus
            ref={this.missionStatusControl}
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
            <button
              className="additionalControlButton"
              onClick={() => {
                if (this.state.mission_start === true &&
                  this.state.launch_start === false &&
                  this.missionStatusControl.current.getStatus() === StatusEnum.VERIFIED) {
                  // Will change the mission status to LAUNCHED if mission started and verified
                  this.missionStatusControl.current.changeStatus(StatusEnum.LAUNCHED);
                  this.setState({ launch_start: true });
                }
              }}>Manual Override</button>

            <button
              className="additionalControlButton"
              onClick={() => {
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
