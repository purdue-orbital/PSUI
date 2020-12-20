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
    layout: null,
    cols: 3,
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.__layout = this.props.layout != null ? this.props.layout : this.__generateLayout();
  }

  __generateLayout() {
    const indicators = this.props.indicators;
    const indicatorKeys = Object.keys(indicators);
    const cols = this.props.cols;
    const rows = Math.ceil(indicatorKeys.length / cols);

    let indicatorTable = [];
    for (let i = 0; i < rows; i++) {
      indicatorTable[i] = indicatorKeys.slice(i * cols, (i + 1) * cols);
    }

    for (let i = indicatorTable[rows - 1].length; i < cols; i++) {
      indicatorTable[rows - 1].push(null);
    }

    return indicatorTable;
  }

  __buildTable() {
    const indicators = this.props.indicators;
    const layout = this.__layout;

    const buildRow = (arrayOfKeys) => {
      return arrayOfKeys.map((key, i) => {
        if (key == null) {return (<td></td>)}
        return (<td><GenericIndicator name={indicators[key].name} data={indicators[key].data} /></td>)
      });
    };

    return (
      <tbody>
        {
          layout.map((x, i) => (<tr key={i}>{buildRow(x)}</tr>))
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
