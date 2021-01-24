import React from 'react';

import Graph from './Graph';

import './styles/GraphSelector.css';

class GraphSelector extends React.Component {
  static defaultProps = {
    data: { defaultData: 0 }
  };

  constructor(props) {
    super(props);
    this.state = {
      currentGraph: Object.keys(this.props.data)[0],
    };

    const startingDataSet = this.props.data;
    this.prevData = this.__createDataHistory(startingDataSet);
    
    this.graphChoices = {};
    for (const k in startingDataSet) {
      const subsetDataset = this.__flattenDataObj(startingDataSet[k]);
      const subsetDatasetKeys = Object.keys(subsetDataset);
      if (subsetDatasetKeys.length === 0) {
        this.graphChoices[k] = [this.prevData[k]];
      } else {
        const lineColors = ['rgb(255, 255, 0)', 'rgb(0, 255, 255)', 'rgb(255, 0, 255)', 'rgb(0, 0, 0)', 'rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)'];
        this.graphChoices[k] = subsetDatasetKeys.map((key, i) => {
          this.prevData[`${k}-${key}`].borderColor = lineColors[i % lineColors.length];
          return this.prevData[`${k}-${key}`];
        });
      }
    }
    console.log(this.graphChoices); // TODO: Remove this after debugging
    
    this.__handleChange = this.__handleChange.bind(this);
  }

  __flattenDataObj(obj, options) {
    if (typeof options === "undefined") { options = {}; }
    if (typeof options.featurePrefix === "undefined") { options.featurePrefix = ""; }

    let flatDataObj = {};
    for (const dictKey in obj) {
      const dictValue = obj[dictKey];
      if (!isNaN(dictValue)) {
        flatDataObj[`${options.featurePrefix}${dictKey}`] = dictValue;
      } else if (typeof dictValue === "object" && dictValue !== null) {
        Object.assign(flatDataObj, this.__flattenDataObj(dictValue, {
          featurePrefix: `${options.featurePrefix}${dictKey}-`,
        }));
      }
    }
    // console.log(flatDataObj); // TODO: Remove after debug
    return flatDataObj;
  }

  componentDidUpdate() {
    const currData = this.__flattenDataObj(this.props.data);
    const now = Date.now();
    for (const k in this.prevData) {
      if (Number.isNaN(currData[k])) {
        continue;
      }
      this.prevData[k].data.shift();
      this.prevData[k].data.push({ "x": now, "y": currData[k] });
    }
  }

  __createDataHistory(data) {
    const histLen = 20;
    const now = Date.now();
    const keys = Object.keys(this.__flattenDataObj(data));
    let historyCacheObj = {};
    keys.forEach(k => historyCacheObj[k] = {
      label: k,
      borderColor: 'rgb(0,0,0)',
      data: Array(histLen).fill({ "x": now, "y": 0 }),
    });
    return historyCacheObj;
  }

  __handleChange(e) {
    this.setState({ currentGraph: e.target.value })
  }

  __createDataSelectOptions() {
    const keys = Object.keys(this.graphChoices);
    return keys.map((k, i) => {
      return (
        <option value={k} key={i}>{k}</option>
      )
    });
  }

  render() {
    const showGraph = this.state.currentGraph;

    // Because we are pasing in entier datasets now it is completly possible to view many datasets at once
    // Might be worth while changing dropdown list to a selection box
    const datasets = this.graphChoices[showGraph];

    return (
      <div id="GraphSelectorDiv">
        <div id="GraphContainer">
          <Graph datasets={datasets} />
        </div>
        <div id="FormContainer">
          <form>
            <label>
              Pick Graph to View:
            <select value={showGraph} onChange={this.__handleChange}>
                {this.__createDataSelectOptions()}
              </select>
            </label>
          </form>
        </div>
      </div>
    );

  }
}

export default GraphSelector;
