import React from 'react';
import Chart from 'chart.js';

import './styles/Graph.css';

class Graph extends React.Component {
  static defaultProps = {
    title: "Untitled Graph",
    width: 400,
    height: 100
  };

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
    const new_data = this.props.data_point;
    const new_title = this.props.title;
    if (Number.isNaN(new_data)) {
      return;
    }
    this.data_points.shift();
    this.data_points.push({
      "x": Date.now(),
      "y": new_data
    });
    this.chart.data.datasets[0].label = new_title;
    this.chart.update();
  }

  render() {
    return (
      <div id="GraphDiv">
        <canvas id="GraphCanvas" ref={this.canvasRef} width={this.props.width} height={this.props.height} />
      </div>
    );
  }
}

export default Graph
