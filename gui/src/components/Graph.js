import React from 'react';
import Chart from "chart.js";
import './styles/Graph.css';


class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.canvasRef = React.createRef();
    this.chart = null;
    this.data_points = [];
    this.start_time = Date.now()
  }

  componentDidMount() {
    // Make random data for now
    const NUM_POINTS = 20;
    for (let i = 0; i < NUM_POINTS; i++) {
      this.data_points.push({
        "x": 0,
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
    this.data_points.shift();
    this.data_points.push({
      "x": Date.now() - this.start_time,
      "y": this.props.data_point
    });
    this.chart.data.datasets.data = this.data_points;
    this.chart.update();
  }

  render() {
    return (
      <div className="GraphDiv">
        <canvas className="GraphCanvas" id="chart" ref={this.canvasRef} width={this.props.width} height={this.props.height} />
      </div>
    );
  }
}

export default Graph
