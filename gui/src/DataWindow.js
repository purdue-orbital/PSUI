import React from 'react';

import Timer from './components/Timer';
import DataTable from './components/DataTable';
import Graph from './components/Graph';
import IndicatorTable from './components/IndicatorTable';

// import * as Comlink from 'comlink';
// import Worker from '';

import './styles/DataWindow.css'

class DataWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mission_start: false,
      launch_start: false,
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

  render() {
    return (
      <div id={'container'}>
        <div id={'leftPannel'}>
          <Timer timer_name="Mission Timer" tick={this.state.mission_start} />
          <Timer timer_name="Launch Timer" tick={this.state.launch_start} />
          <button onClick={() => { this.setState(state => ({ mission_start: true })); }}>Start Mission</button>
          <button onClick={() => { this.setState(state => ({ launch_start: true })); }}>Start Launch</button>
          <DataTable data={this.state.current_data} />
        </div>
        <div id={'rightPannel'}>
          TODO: Put all of the radio stuff here!!
          <IndicatorTable indicators={this.state.current_indicators}/>
        </div>
        <div id={'bottomPannel'}>
          <Graph
            data_point={this.state.current_data.This}
            title={'This vs Time'}
          />
        </div>
      </div>
    );
  }
}

export default DataWindow;
