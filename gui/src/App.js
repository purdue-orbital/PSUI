import React from 'react';

import MainWindow from './pages/MainPage/MainPage.js';
import './styles/BasicElements.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<MainWindow />);
  }
}

export default App;