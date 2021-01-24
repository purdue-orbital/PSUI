import React from 'react';
import Chart from 'chart.js';

import './styles/Graph.css';

class Graph extends React.Component {
  static defaultProps = {
    datasets: [],
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
    this.__makeNewChart(this.props.datasets)
  }
  
  __makeNewChart(datasets) {
    if (this.chart != null) {
      this.chart.destroy();
      this.chart = null;
    }
    const ctx = this.canvasRef.current.getContext("2d");
    this.chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',
      data: {
        datasets: datasets
      },

      // Configuration options go here
      options: {
        events: [],
        tooltips: {
          enabled: false,
        },
        hover: {
          mode: null,
        },
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
            },
          }],
          yAxes: [{
            ticks: {
              suggestedMin: 0,
              suggestedMax: 1
            }
          }]
        },
        animation: {
          duration: 0,
        },
        maintainAspectRatio: false,
      }
    });
  }

  componentDidUpdate() {
    const curr_datasets = this.chart.data.datasets;
    const new_datasets = this.props.datasets;

    if (curr_datasets !== new_datasets) {
      console.log("DATA CHANGE!!"); // TODO: Remove this after debugging
      this.chart.stop().reset();
      this.__makeNewChart(new_datasets);
    } else {
      this.chart.update();
    }

  }

  render() {
    return (
      <div id="GraphDiv">
        <canvas id="GraphCanvas" ref={this.canvasRef} />
      </div>
    );
  }
}

export default Graph
