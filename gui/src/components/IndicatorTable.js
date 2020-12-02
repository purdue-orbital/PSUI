import React from 'react';

import GenericIndicator from './Indicators/GenericIndicator.js';

class IndicatorTable extends React.Component {
  static defaultProps = {
    packetsSent: 0,
    packetsRecieved: 0,
    QDM: false,
    Ignition: false,
    GSRadio: false,
    PlatformStability: false,
    PlatformRadio: false,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  buildTable() {

  }

  render() {
    return (
      <div>
        Put table here
      </div>
    );
  }
}

export default IndicatorTable;
