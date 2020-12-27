import React from 'react';

import Graph from './Graphs/Graph';

class GraphSelector extends React.Component {
  static defaultProps = {
    data: { defaultData: 0 }
  };

  constructor(props) {
    super(props);
    this.state = {
      currentGraph: "This",
    };
  }

  __handleSubmit(e) {
    console.log("Got Event");
    e.preventDefault();
  }

  __createDataSelectOptions() {
    const data = this.props.data;
    const keys = Object.keys(data);
    return keys.map((k) => {
      return (
        <option value={k} key={k}>{k}</option>
      )
    });
  }

  render() {
    const data = this.props.data;
    const showGraph = this.state.currentGraph;

    return (
      <div>
        <Graph
          data_point={data[showGraph]}
          title={`${showGraph} vs Time`}
        />
        <form onSubmit={this.__handleSubmit}>
          <label>
            Pick Graph to View:
            <select>
              {this.__createDataSelectOptions()}
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );

  }
}

export default GraphSelector;