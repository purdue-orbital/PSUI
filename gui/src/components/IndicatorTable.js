import React from 'react';

import GenericIndicator from './Indicators/GenericIndicator.js';

class IndicatorTable extends React.Component {
  static defaultProps = {
    indicators: {
      packetsSent: { name: "Packets Sent", data: 0, },
      packetsRecieved: { name: "Packets Recieved", data: 0, },
      QDM: { name: "QDM", data: false, },
      Ignition: { name: "Ignition", data: false, },
      GSRadio: { name: "GS Radio", data: false, },
      PlatformStability: { name: "Platform Stability", data: false, },
      PlatformRadio: { name: "Platform Radio", data: false, },
    },
    cols: 3,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  __buildTable() {
    const indicators = this.props.indicators;
    const indicatorKeys = Object.keys(indicators);
    const cols = this.props.cols;
    const rows = indicatorKeys.length / cols;

    let indicatorTable = [];
    for (let i = 0; i < rows; i++) {
      indicatorTable[i] = indicatorKeys.slice(i * cols, (i + 1) * cols)
    }

    console.log(indicatorTable);

    const buildRow = (arrayOfKeys) => {
      return arrayOfKeys.map((key, i) => (<td><GenericIndicator name={indicators[key].name} data={indicators[key].data}/></td>))
    };

    return (
      <tbody>
        {
          indicatorTable.map((x, i) => (<tr key={i}>{buildRow(x)}</tr> ))
        }
      </tbody>
    );
  }

  render() {
    return (
      <div>
        Put table
        <table>
          {this.__buildTable()}
        </table>
      </div>
    );
  }
}

export default IndicatorTable;
