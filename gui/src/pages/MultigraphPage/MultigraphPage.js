import React from 'react';
import GraphSelector from '../../components/Graphs/GraphSelector/GraphSelector';
import './MultigraphPage.css';

class MultigraphPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.accelRef = React.createRef();
    this.gyroRef = React.createRef();
    this.distRef = React.createRef();
    this.altRef = React.createRef();
  }

  reset() {
    this.accelRef.current.reset();
    this.gyroRef.current.reset();
    this.distRef.current.reset();
    this.altRef.current.reset();
  }

  render() {
    const data = this.props.currentData;

    return (
      <div id="container">
        <div id="graphPanelMini">
          <GraphSelector ref={this.accelRef} data={data} defaultStartGraph="Acceleration" />
        </div>
        <div id="graphPanelMini">
          <GraphSelector ref={this.gyroRef} data={data} defaultStartGraph="Gyro" />
        </div>
        <div id="graphPanelMini">
          <GraphSelector ref={this.distRef} data={data} defaultStartGraph="Distance" />
        </div>
        <div id="graphPanelMini">
          <GraphSelector ref={this.altRef} data={data} defaultStartGraph="Altitude" />
        </div>
      </div>
    );
  }
}

export default MultigraphPage;
