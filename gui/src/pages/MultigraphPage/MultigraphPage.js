import React from 'react';
import GraphSelector from '../../components/Graphs/GraphSelector/GraphSelector';
import DataTable from '../../components/DataTable/DataTable.js'

class MultigraphPage extends React.Component {
  render() {
    const data = this.props.currentData;

    console.log(this.props.currentData);

    return (
      <div id="container">
        {/* <div id="graphPanelMini">
          <GraphSelector data={data} defaultStartGraph="Altitude"/>
        </div>
        <div id="graphPanelMini">
          <GraphSelector data={data} defaultStartGraph="Longitude"/>
        </div>
        <div id="graphPanelMini">
          <GraphSelector data={data} defaultStartGraph="Latitude"/>
        </div>
        <div id="graphPanelMini">
          <GraphSelector data={data} defaultStartGraph="Gyro"/>
        </div>
        <div id="graphPanelMini">
          <GraphSelector data={data} defaultStartGraph="Temperature"/>
        </div>
        <div id="graphPanelMini">
          <GraphSelector data={data} defaultStartGraph="Acceleration"/>
        </div> */}
        {/* <DataTable data={data}/> */}
        Words
      </div>
    );
  }
}

export default MultigraphPage;
