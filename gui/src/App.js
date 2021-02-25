import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import MainPage from './pages/MainPage/MainPage.js';
import MultigraphPage from './pages/MultigraphPage/MultigraphPage.js'
import './styles/BasicElements.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <HashRouter>
        <Route exact path="/" component={MainPage} />
        <Route path="/multigraph" component={MultigraphPage} />
      </HashRouter>
    );
  }
}

export default App;