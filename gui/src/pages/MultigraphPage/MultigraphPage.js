import React from 'react';
import GraphSelector from '../../components/Graphs/GraphSelector/GraphSelector';

class MultigraphPage extends React.Component {
  render() {
    const data = this.props.currentData;

    return (
      <div id="container">
        <div id="graphPanel">
          <GraphSelector data={data} />
        </div>
        <div id="graphPanel">
          <GraphSelector data={data} />
        </div>
        <div id="graphPanel">
          <GraphSelector data={data} />
        </div>
      </div>
    );
  }
}

export default MultigraphPage;
