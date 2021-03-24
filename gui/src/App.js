import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import MainPage from './pages/MainPage/MainPage.js';
import MultigraphPage from './pages/MultigraphPage/MultigraphPage.js'
import './styles/BasicElements.css';

const { ipcRenderer } = window.require("electron");


class App extends React.Component {
  loadDataInterval = null;

  constructor(props) {
    super(props);
    this.state = { // Begin state
      isTestMode: false,
      currData: undefined,
    };
  }

  componentDidMount() {
    ipcRenderer.on("SetTestMode", (_event, isTestMode) => {
      this.setState({ isTestMode: isTestMode });
    });
    ipcRenderer.on("RequestData", (_event, newCurrData) => {
      this.setState({ currData: newCurrData });
    });
  }

  componentWillUnmount() {
    clearInterval(this.loadDataInterval);
    // TODO: need to clean up ipcRender events here
  }

  render() {
    const isTestMode = this.state.isTestMode;
    const currData = this.state.currData;
    return (
      <HashRouter>
        <Route exact path="/" render={props => <MainPage {...props} currentData={currData} testMode={isTestMode} />} />
        <Route path="/multigraph" render={props => <MultigraphPage {...props} currentData={currData} />} />
      </HashRouter>
    );
  }
}

export default App;
