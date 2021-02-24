import React from 'react';

import './DataTable.css';

class DataTable extends React.Component {
  static defaultProps = {
    title: "DATA",
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  __renderTableRows(dataObj) {
    let numRowsRendered = 0;

    const makeTableRows = (dataObj, options) => {
      if (options === undefined) { options = {}; }
      if (options.rowPrefix === undefined) { options.rowPrefix = ""; }
      return (
        <>
          {
            Object.keys(dataObj).map(key => {
              const data = dataObj[key];
              if (typeof data === "object" && data !== null) {
                return makeTableRows(data, {
                  rowPrefix: `${options.rowPrefix}${key}-`,
                })
              } else if (typeof data === "number") {
                const rowName = `${options.rowPrefix}${key}`
                const val = parseFloat(data).toFixed(4);
                return (
                  <tr className={numRowsRendered++ % 2 === 0 ? "AltRow" : ""} key={`DataTableRow-${rowName}`}>
                    <td className="LabelCol">{rowName}</td>
                    <td className="ValueCol">{val}</td>
                  </tr>
                );
              } else {
                return null;
              }
            })
          }
        </>
      );
    }

    return makeTableRows(dataObj);
  }

  render() {
    const tableTitle = this.props.title;
    const data = this.props.data;
    return (
      <div className="DataTableContainer">
        <table className="DataTable">
          <thead>
            <tr key="DataTableTitle">
              <th colSpan={2}>{tableTitle}</th>
            </tr>
            <tr key="DataTableLabels">
              <th>LABEL</th>
              <th>VALUE</th>
            </tr>
          </thead>
          <tbody>{this.__renderTableRows(data)}</tbody>
        </table>
      </div>
    );
  }
}

export default DataTable