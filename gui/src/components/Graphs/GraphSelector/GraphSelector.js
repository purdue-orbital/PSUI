import React from 'react';

import Graph from '../Graph/Graph.js';

import './GraphSelector.css';

const { ipcRenderer } = window.require("electron");

class GraphSelector extends React.Component {
  static defaultProps = {
    data: { defaultData: 0 },
    defaultStartGraph: null
  };

  constructor(props) {
    super(props);
    this.state = {
      currentGraph: this.defaultStartGraph,
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
    // Not sure that this should be removing all? Maybe just the on created on mount?
    // TODO: Needs research!!
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

  componentDidUpdate(prevProps) {
    const updatedData = this.__getUpdatedData();
    if ((updatedData !== null) && (updatedData !== undefined) && (Object.keys(updatedData).length !== Object.keys(this.__flattenDataObj(prevProps.data)).length)) {  // The __flattenDataObj call is a quick fix that Matt wants to change later
      // If the size of the dataset changes, create new structure for the data
      console.log("data size change detected!");
      this.prevData = this.__createDataHistory(updatedData);
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

  __getUpdatedData() {
    // Used to determine if new data point recieved or if the graph just changed
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

  get defaultStartGraph() {
    const defaultStart = this.props.defaultStartGraph;
    if (defaultStart !== null && Object.keys(this.props.data).includes(defaultStart)) {
      return defaultStart
    }
    return Object.keys(this.props.data)[0];
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
