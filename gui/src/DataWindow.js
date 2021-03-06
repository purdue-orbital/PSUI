import React from 'react';

import StatusEnum from './utils/StatusEnum.js'
import PopUpGenerator from './utils/PopUpGenerator.js'

import Timer from './components/Timer/Timer.js';
import DataTable from './components/DataTable/DataTable';
import IndicatorTable from './components/Indicators/IndicatorTable/IndicatorTable.js';
import GraphSelector from './components/Graphs/GraphSelector/GraphSelector.js';
import CurrentStatus from './components/MissionStatus/CurrentStatus.js';
import CountdownTimer from './components/Timer/CountdownTimer.js';

import './styles/DataWindow.css';
import './styles/BasicElements.css';

class DataWindow extends PopUpGenerator {
  constructor(props) {
    super(props, {
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
          Y: 0,
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
    });
    // Currently reading mission status w/ a ref, but status 
    // could be moved here for unidirectional downward flow of props
    this.missionStatusControl = React.createRef();
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
            Y: Math.random(),
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
    const mission_start = this.state.mission_start;
    const launch_start = this.state.launch_start;

    return (
      <div id='container'>
        <div id='leftPannel'>
          <div id='timerContainer'>
            <Timer timerName="Mission Timer" tick={mission_start} />
            {mission_start ? <Timer timerName="Launch Timer" tick={launch_start} /> : <CountdownTimer />}
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

          <div className="additionalControls">
            <button
              className="additionalControlButton"
              onClick={() => {
                if (this.state.mission_start !== true) {
                  this.nonblockingMessage("The mission must be started before you attempt to launch");
                } else if (this.missionStatusControl.current.getStatus() !== StatusEnum.VERIFIED) {
                  this.nonblockingMessage("The mission must be verified before you attempt to launch");
                } else if (this.state.launch_start === false) {
                  // Will change the mission status to LAUNCHED if mission started and verified, on user confirmation
                  this.nonblockingConfirmation("Pressing 'Continue' will launch the rocket! [NOT REVERSIBLE]", {
                    isImportant: true,
                    onAccept: () => {
                      this.missionStatusControl.current.changeStatus(StatusEnum.LAUNCHED);
                      this.setState({ launch_start: true });
                    },
                  });
                }
              }}>Manual Override</button>

            <button
              className="additionalControlButton"
              onClick={() => {
                this.nonblockingConfirmation("You are about to activate stabilization", {
                  onAccept: () => {
                    alert("¯\\_(ツ)_/¯");
                  },
                });
              }}>Stabilization</button>
          </div>

          <div id="logoPannel">
            <img src={process.env.PUBLIC_URL + '/img/orbital-logo.png'} alt="Purdue Orbital" />
          </div>
        </div>

        <div id='graphPannel'>
          <GraphSelector data={data} />
        </div>
        {this.renderPopUp()}
      </div >
    );
  }
}

export default DataWindow;
