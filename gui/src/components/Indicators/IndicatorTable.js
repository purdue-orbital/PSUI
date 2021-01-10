import React from 'react';

import GenericIndicator from './GenericIndicator.js';

import './styles/IndicatorTable.css';

class IndicatorTable extends React.Component {
  static defaultProps = {
    indicators: {
      packetsSent: { name: "Packets Sent", data: 0, },
      packetsRecieved: { name: "Packets Recieved", data: 0, },
    },
    title: null,
    layout: null,
    cols: 3,
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.__layout = this.props.layout != null ? this.props.layout : this.__generateLayout();
    this.__numCols = 1;
    this.__layout.forEach(element => {
      const len = element.length;
      if (len > this.__numCols) {
        this.__numCols = len;
      }
    });
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

  __buildTableTitle() {
    const title = this.props.title;
    const titleSpan = this.__numCols;

    if (title === null) {
      return null;
    }

    return (
      <thead>
        <tr key={"IndicatorTableTitle"}>
          <th colSpan={titleSpan}>{title}</th>
        </tr>
      </thead>
    );
  }

  __buildTableBody() {
    const indicators = this.props.indicators;
    const layout = this.__layout;

    const buildRow = (arrayOfKeys) => {
      return arrayOfKeys.map((key, i) => {
        if (key == null) { return (<td></td>); }
        return (<td><GenericIndicator name={indicators[key].name} data={indicators[key].data} /></td>);
      });
    };

    return (
      <tbody>
        {
          layout.map((x, i) => {
            const key = `IndicatorTableRow${i}`;
            return (<tr key={key}>{buildRow(x)}</tr>);
          })
        }
      </tbody>
    );
  }

  render() {

    return (
      <div className="IndicatorTableContainer">
        <table className="IndicatorTable">
          {this.__buildTableTitle()}
          {this.__buildTableBody()}
        </table>
      </div>
    );
  }
}

export default IndicatorTable;
