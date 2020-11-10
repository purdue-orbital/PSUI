import React from 'react';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const chart = this.canvasRef.current.getContext("2d");
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
