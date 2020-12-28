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

    this.prevData = this.__createDataHistory(this.props.data);
    this.__handleChange = this.__handleChange.bind(this);
  }

  componentDidUpdate() {
    const currData = this.props.data;
    const now = Date.now();
    for (const k in this.prevData) {
      if (Number.isNaN(currData[k])) {
        continue;
      }
      this.prevData[k].data.shift();
      this.prevData[k].data.push({"x": now, "y": currData[k]});
    }
    // console.log(this.prevData);
  }

  __createDataHistory(data) {
    const histLen = 20;
    const now = Date.now();
    const keys = Object.keys(data);
    let historyCacheObj = {};
    keys.forEach(k => historyCacheObj[k] = {
      label: k,
      data: Array(histLen).fill({"x": now, "y": 0}),
    });
    return historyCacheObj;
  }

  __handleChange(e) {
    this.setState({ currentGraph: e.target.value })
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

    const datasets = [this.prevData[showGraph], this.prevData["Another"]]; 
    console.log(datasets);

    return (
      <div>
        <Graph datasets={datasets}/>
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