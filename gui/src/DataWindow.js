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
      current_data: { "This": 0, "is": 0, "Some": 0, "Data": 0, "Another": 0 }
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        current_data: {
          "This": (1000 - 1) * Math.random() + 1, // random from 1 to 1000
          "is": Math.random(),
          "Some": Math.random(),
          "Data": Math.random(),
          "Another": Math.random(),
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
          <IndicatorTable />
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
