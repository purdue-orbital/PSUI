import React from 'react';

import Graph from '../Graph/Graph.js';

import './GraphSelector.css';

const { ipcRenderer } = window.require("electron");

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
        const lineColors = ['rgb(255, 255, 0)', 'rgb(0, 255, 255)', 'rgb(255, 0, 255)', 'rgb(0, 0, 0)', 'rgb(255,188,18)', 'rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)'];
        this.graphChoices[k] = subsetDatasetKeys.map((key, i) => {
          this.prevData[`${k}-${key}`].borderColor = lineColors[i % lineColors.length];
          return this.prevData[`${k}-${key}`];
        });
      }
    }
  }

  componentDidMount() {
    ipcRenderer.on("ChangeGraph", (event, arg) => {
      this.__changeCurentGraph(arg.newGraph);
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners("ChangeGraph");
  }

  __flattenDataObj(obj, options) {
    if (options === undefined) { options = {}; }
    if (options.featurePrefix === undefined) { options.featurePrefix = ""; }

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
    return flatDataObj;
  }

  componentDidUpdate() {
    const updatedData = this.__dataDidUpdate();
    if (updatedData !== null) {
      // If there is a new data point, we need to update prev data
      this.__updateDataBuffers(updatedData);
    }
  }

  __createDataHistory(data) {
    const histLen = 20;
    const now = Date.now();
    const keys = Object.keys(this.__flattenDataObj(data));
    let historyCacheObj = {};
    keys.forEach(k => historyCacheObj[k] = {
      label: k,
      borderColor: 'rgb(255,188,18)', // Is the same gold as the buttons, if no like use black 'rgb(0,0,0)'
      data: Array(histLen).fill({ "x": now, "y": 0 }),
    });
    return historyCacheObj;
  }

  __changeCurentGraph(newGraph) {
    const currentGraph = this.state.currentGraph;
    if (newGraph !== currentGraph) {
      this.setState({ currentGraph: newGraph });
    }
  }

  __dataDidUpdate() {
    // Used to determine if new data point recieved or if the grah just changed
    const incomingData = this.__flattenDataObj(this.props.data);
    for (const k in this.prevData) {
      const prevDataSet = this.prevData[k].data;
      const prevData = prevDataSet[prevDataSet.length - 1].y;
      const newDataPoint = incomingData[k]; 
      if (prevData !== newDataPoint) {
        // If these are two different numbers, then data updated, returned the flattend data obj
        return incomingData;
      }
    }
    // If all the numbers are the same as before, then no update in data object and nothing to return
    return null;
  }
  __updateDataBuffers(newflattenedData) {
    const now = Date.now();
    for (const k in this.prevData) {
      if (isNaN(newflattenedData[k])) {
        continue;
      }
      this.prevData[k].data.shift();
      this.prevData[k].data.push({ "x": now, "y": newflattenedData[k] });
    }
  }

  render() {
    const showGraph = this.state.currentGraph;
    const datasets = this.graphChoices[showGraph];

    return (
      <div id="GraphSelectorDiv">
        <div id="GraphContainer">
          <Graph datasets={datasets} />
        </div>
      </div>
    );
  }
}

export default GraphSelector;
