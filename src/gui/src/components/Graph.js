import React from 'react';
import Chart from "chart.js";


class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const chart = this.canvasRef.current.getContext("2d");
    new Chart(chart, {});
  }

  render() {
    return (
      <div>
        <canvas id="chart" ref={this.canvasRef}/>
      </div>
    );
  }
}

export default Graph
