import React from 'react';

import GenericIndicator from './Indicators/GenericIndicator.js';

class IndicatorTable extends React.Component {
  static defaultProps = {
    indicators: {
      packetsSent: {name: "Packets Sent", data: 0, },
      packetsRecieved: {name: "Packets Recieved", data: 0, },
      QDM: {name: "QDM", data: false, },
      Ignition: {name: "Ignition", data: false, },
      GSRadio: {name: "GS Radio", data: false, },
      PlatformStability: {name: "Platform Stability", data: false, },
      PlatformRadio: {name: "Platform Radio", data: false, },
    },
    rows: null,
    cols: null,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  buildTable() {
    const indicators = this.props.indicators;
    const inidcaorKeys = Object.keys(indicators);
    return (
      <tbody>
        {
          inidcaorKeys.map((key, i) => (
            <tr>
              <td><GenericIndicator name={indicators[key].name} data={indicators[key].data}/></td>
            </tr>
          ))
        }
      </tbody>
    );
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
