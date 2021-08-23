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

    this.graphChoices = null;
    this.prevData = null;
    this.__createEmptyGraphs(this.props.data);
  }

  componentDidMount() {
    ipcRenderer.on("ChangeGraph", (_event, arg) => {
      this.__changeCurentGraph(arg.newGraph);
    });
  }

  reset() {
    this.__createEmptyGraphs(this.props.data);
  }

  componentWillUnmount() {
    // Not sure that this should be removing all? Maybe just the on created on mount?
    ipcRenderer.removeAllListeners("ChangeGraph");
  }


  __createEmptyGraphs(startingDataSet) {
    // Build (or rebuild) the arrays of data sets being displayed on the graphs

    this.prevData = this.__createDataHistory(startingDataSet);

    this.graphChoices = {};
    for (const k in startingDataSet) {
      const subsetDataset = this.__flattenDataObj(startingDataSet[k]);
      const subsetDatasetKeys = Object.keys(subsetDataset);

      if (subsetDatasetKeys.length === 0) {
        // Dataset had no sub objects - add single dataset to the array
        // of datasets to display on graph for this key 
        this.graphChoices[k] = [this.prevData[k]];
      } else {
        // Dataset had sub objects - many datasets need to be displayed on graph
        // for this key. Map the array of keys to the array of datasets in the prevData obj
        // Also style the lines different colors
        const lineColors = ['rgb(255, 255, 0)', 'rgb(0, 255, 255)', 'rgb(255, 0, 255)', 'rgb(0, 0, 0)', 'rgb(255,188,18)', 'rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)'];
        this.graphChoices[k] = subsetDatasetKeys.map((key, i) => {
          this.prevData[`${k}-${key}`].borderColor = lineColors[i % lineColors.length];
          return this.prevData[`${k}-${key}`];
        });
      }
    }
  }

  __flattenDataObj(obj, options) {
    // Reduces a multidimensional object of numbers to a single
    // dimension object of number. Keys and sub keys are concated by '-'
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
    const updatedData = this.__getUpdatedData();
    if (updatedData !== null) {
      // If there is a new data point, we need to update prev data
      this.__updateDataBuffers(updatedData);
    }
  }

  __createDataHistory(data) {
    // Create and return an object 20 elements of each graph-able line
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
