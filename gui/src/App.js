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

    const currState = ipcRenderer.sendSync("SetUpReq");
    this.state = currState;
  }

  componentDidMount() {
    // Set up chanels after sync message is resolved and compenent is brought up to date
    ipcRenderer.on("SetTestMode", (_event, isTestMode) => {
      this.setState({ isTestMode: isTestMode });
    });
    ipcRenderer.on("RequestData", (_event, newCurrData) => {
      // Check that recieved data is not null, and then update
      if (newCurrData) {
        this.setState({ currData: newCurrData });
      }
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
