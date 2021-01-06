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

  makeTableRows() {
    return (
      <tbody>
        {
          Object.keys(this.props.data).map((key, i) => (
            <tr className={i % 2 === 0 ? "DarkRow" : ""} key={`DataTableRow${key}`}>
              <td className="LabelCol">{key}</td>
              <td className="ValueCol">{this.props.data[key]}</td>
            </tr>
          ))
        }
      </tbody>
    );
  }

  render() {
    const tableTitle = this.props.title;
    return (
      <div>
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
          {this.makeTableRows()}
        </table>
      </div>
    );
  }
}

export default DataTable