import React from 'react';
import Chart from 'chart.js';

import * as Comlink from 'comlink';
import Worker from './workers/Graph.worker.js'

import './styles/Graph.css';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.canvasRef = React.createRef();
    this.chart = null;
    this.data_points = [];
    this.start_time = Date.now();
  }

  componentDidMount() {
    // Make random data for now
    const NUM_POINTS = 20;
    for (let i = 0; i < NUM_POINTS; i++) {
      this.data_points.push({
        "x": this.start_time,
        "y": 0
      });
    }

    const chart = this.canvasRef.current.getContext("2d");
    this.chart = new Chart(chart, {
      // The type of chart we want to create
      type: 'line',
      data: {
        datasets: [{
          label: this.props.title,
          borderColor: 'rgb(0, 0, 0)',
          data: this.data_points
        }]
      },

      // Configuration options go here
      options: {
        elements: {
          line: {
            tension: 0
          }
        },
        scales: {
          xAxes: [{
            type: 'time',
            position: 'bottom',
            display: false,
            ticks: {
              suggestedMin: 0
            }
          }],
          yAxes: [{
            ticks: {
              suggestedMin: 0,
              suggestedMax: 1
            }
          }]
        }
      }
    });
  }

  componentDidUpdate() {
    const worker = new Worker(); 
    async function updateChart(worker, data_points, data_point) {
      const api = Comlink.wrap(worker);
      await api.updateChart(data_points, data_point);
    }
    updateChart(worker, Comlink.proxy(this.data_points), this.props.data_point).then(() => {
      this.chart.update();
      worker.terminate();
    });
  }

  render() {
    return (
      <div id="GraphDiv">
        <canvas id="GraphCanvas" ref={this.canvasRef} width={this.props.width} height={this.props.height} />
      </div>
    );
  }
}

Graph.defaultProps = {
  title: "Untitled Graph",
  width: 400,
  height: 100
};

export default Graph
