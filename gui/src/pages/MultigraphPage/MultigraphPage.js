import React from 'react';
import GraphSelector from '../../components/Graphs/GraphSelector/GraphSelector';
import './MultigraphPage.css';

class MultigraphPage extends React.Component {
  render() {
    const data = this.props.currentData;

    return (
      <div id="container">
        <div id="graphPanelMini">
          <GraphSelector data={data} defaultStartGraph="Acceleration" />
        </div>
        <div id="graphPanelMini">
          <GraphSelector data={data} defaultStartGraph="Gyro" />
        </div>
        <div id="graphPanelMini">
          <GraphSelector data={data} defaultStartGraph="Distance" />
        </div>
        <div id="graphPanelMini">
          <GraphSelector data={data} defaultStartGraph="Altitude" />
        </div>
      </div>
    );
  }
}

export default MultigraphPage;
