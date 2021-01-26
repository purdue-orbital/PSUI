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
    const indicatorIndexes = Object.keys(indicators); // Get array of indexes of of indeicators in increasing order
    const cols = this.props.cols;
    const rows = Math.ceil(indicatorIndexes.length / cols);

    let indicatorTable = [];
    for (let i = 0; i < rows; i++) {
      indicatorTable[i] = indicatorIndexes.slice(i * cols, (i + 1) * cols);
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

    const buildRow = (arrayOfIndices) => {
      return arrayOfIndices.map((index) => {
        if (index == null) { return (<td></td>); }
        return (<td><GenericIndicator name={indicators[index].name} data={indicators[index].data} /></td>);
      });
    };

    return (
      <tbody>
        {
          layout.map((RowArr, RowNum) => {
            const key = `IndicatorTableRow${RowNum}`;
            return (<tr key={key}>{buildRow(RowArr)}</tr>);
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
