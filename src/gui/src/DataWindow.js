import React from 'react';

import Timer from './components/Timer'
import DataTable from './components/DataTable'

class DataWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mission_start: false,
      launch_start: false
    };
  }

  render() {
    return(
      <div className="App">
        <Timer timer_name="Mission Timer" tick={this.state.mission_start} />
        <Timer timer_name="Launch Timer" tick={this.state.launch_start} />
        <button onClick={() => { this.setState(state => ({ mission_start: true }));} }>Start Mission</button>
        <button onClick={() => { this.setState(state => ({ launch_start: true })); }}>Start Launch</button>
        <DataTable data={{"This": 1, "is": 2, "Some": 3, "Data": 4}} />
      </div>
    );
  }
}

export default DataWindow;
