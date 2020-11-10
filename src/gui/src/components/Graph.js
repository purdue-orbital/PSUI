import React from 'react';

class Graph extends React.Component {
  canvasRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // const chart = this.canvasRef.current.getContext("2d");
  }

  render() {
    return (
      <div>
        <canvas id="chart" ref={this.chartRef}/>
      </div>
    );
  }
}

export default Graph
