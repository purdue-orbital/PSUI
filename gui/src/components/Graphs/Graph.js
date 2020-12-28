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
    const datasets = this.props.datasets;
    const chart = this.canvasRef.current.getContext("2d");
    this.chart = new Chart(chart, {
      // The type of chart we want to create
      type: 'line',
      data: {
        datasets: datasets
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
    const new_datasets = this.props.datasets
    this.chart.data.datasets = new_datasets;
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