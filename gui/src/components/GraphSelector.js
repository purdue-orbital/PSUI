import React from 'react';

import Graph from './Graphs/Graph';

class GraphSelector extends React.Component {
  static defaultProps = {
    data: { defaultData: 0 }
  };

  constructor(props) {
    super(props);
    this.state = {
      currentGraph: "is",
    };

    this.__handleChange = this.__handleChange.bind(this);
  }

  __handleChange(e) {
    this.setState({currentGraph: e.target.value})
  }

  __createDataSelectOptions() {
    const data = this.props.data;
    const keys = Object.keys(data);
    return keys.map((k, i) => {
      return (
        <option value={k} key={i}>{k}</option>
      )
    });
  }

  render() {
    const data = this.props.data;
    const showGraph = this.state.currentGraph;
    const graphTitle = `${showGraph} vs Time`;

    return (
      <div>
        <Graph
          data_point={data[showGraph]}
          title={graphTitle}
        />
        <form>
          <label>
            Pick Graph to View:
            <select value={showGraph} onChange={this.__handleChange}>
              {this.__createDataSelectOptions()}
            </select>
          </label>
        </form>
      </div>
    );

  }
}

export default GraphSelector;