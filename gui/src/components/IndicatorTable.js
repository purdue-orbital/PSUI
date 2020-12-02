import React from 'react';

import GenericIndicator from './Indicators/GenericIndicator.js';

class IndicatorTable extends React.Component {
  static defaultProps = {
    indicators: {
      packetsSent: {name: "Packets Sent", Data: 0, },
      packetsRecieved: {name: "Packets Sent", Data: 0, },
      QDM: {name: "Packets Sent", Data: 0, },
      Ignition: {name: "Packets Sent", Data: 0, },
      GSRadio: {name: "Packets Sent", Data: 0, },
      PlatformStability: {name: "Packets Sent", Data: 0, },
      PlatformRadio: {name: "Packets Sent", Data: 0, },
    },
    rows: null,
    cols: null,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  buildTable() {
    return (
      <tbody>
        {
          Object.keys(this.props.indicators).map((key, i) => (
            <tr>
              <td>{key}</td>
              <td><GenericIndicator /></td>
            </tr>
          ))
        }
      </tbody>
    )
  }

  render() {
    return (
      <div>
        Put table
        <table>
          {this.buildTable()}
        </table>
      </div>
    );
  }
}

export default IndicatorTable;
