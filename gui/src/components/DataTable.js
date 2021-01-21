import React from 'react';
import './styles/DataTable.css';

class DataTable extends React.Component {
  static defaultProps = {
    title: "DATA",
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  makeTableRows(dataObj, options) {
    if (typeof options === "undefined") { options = {}; } 
    if (typeof options.startRowNum === "undefined") { options.startRowNum = 0; } 
    if (typeof options.rowPrefix === "undefined") { options.rowPrefix = ""; } 
    return (
      <>
        {
          Object.keys(dataObj).map((key, i) => {
            const index = i + options.startRowNum;
            const data = dataObj[key];
            if (typeof data === "object") {
              return this.makeTableRows(data, {
                rowPrefix: `${key} - `,
                startRowNum: index,
              })
            }
            const rowName = `${options.rowPrefix}${key}`
            const val = parseFloat(data).toFixed(4);
            return (
              <tr className={index % 2 === 0 ? "AltRow" : ""} key={`DataTableRow - ${rowName}`}>
                <td className="LabelCol">{rowName}</td>
                <td className="ValueCol">{val}</td>
              </tr>
            )
          })
        }
      </>
    );
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
          <tbody>{this.makeTableRows(data)}</tbody>
        </table>
      </div>
    );
  }
}

export default DataTable