import React from 'react';
import Chart from "chart.js";


class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    // Make random data for now
    const NUM_POINTS = 50;
    let rng_data = [];
    for (let i = 0; i < NUM_POINTS; i++) {
      rng_data.push({
        "x": Math.random(),
        "y": Math.random()
      });
    }
    rng_data.sort(function(first, second) {
      return first.x - second.x
    });

    const chart = this.canvasRef.current.getContext("2d");
    new Chart(chart, {
      // The type of chart we want to create
      type: 'line',
      data: {
        datasets: [{
          label: 'Graph',
          borderColor: 'rgb(0, 0, 0)',
          data: rng_data
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
            type: 'linear',
            position: 'bottom'
          }]
        }
      }
    });
  }

  render() {
    return (
      <div>
        <canvas id="chart" ref={this.canvasRef} />
      </div>
    );
  }
}

export default Graph
