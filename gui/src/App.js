import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import MainPage from './pages/MainPage/MainPage.js';
import MultigraphPage from './pages/MultigraphPage/MultigraphPage.js'
import './styles/BasicElements.css';

class App extends React.Component {
  loadDataInterval = null;

  constructor(props) {
    super(props);
    // FIXME: This state will not be consistant across many instances (i.e. different windows, tabs, etc)
    // Consider migrating to sessionStorage or equivelent
    this.state = { // Begin state
      currData: { // Begin currData
        Altitude: 0,
        Longitude: 0,
        Latitude: 0,
        Gyro: { // Begin Gyro
          X: 0,
          Y: 0,
          Z: 0,
        }, // End Gyro
        Temperature: 0,
        Acceleration: { // Begin Acceleration
          X: 0,
          Y: 0,
          Z: 0,
        }, // End Acceleration
      }, // End currData
    }; // End state
  }

  componentDidMount() {
    this.loadDataInterval = setInterval(() => {
      this.setState({
        currData: { // Begin currDatat
          Altitude: Math.random(),
          Longitude: Math.random(),
          Latitude: Math.random(),
          Gyro: { // Begin Gyro
            X: Math.random(),
            Y: Math.random(),
            Z: Math.random(),
          }, // End Gyro
          Temperature: Math.random(),
          Acceleration: { // Begin Acceleration
            X: Math.random(),
            Y: Math.random(),
            Z: Math.random(),
          }, // End Acceleration
        }, // End currData
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.loadDataInterval);
  }

  render() {
    const currData = this.state.currData;
    return (
      <HashRouter>
        <Route exact path="/" render={props => <MainPage {...props} currentData={currData}/>} />
        <Route path="/multigraph" render={props => <MultigraphPage {...props} currentData={currData}/>} />
      </HashRouter>
    );
  }
}

export default App;
