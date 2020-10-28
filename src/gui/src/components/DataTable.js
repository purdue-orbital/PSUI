import React from 'react';
import './styles/DataTable.css';

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr key="TITLE">
              <th>LABEL</th>
              <th>DATA</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(this.props.data).map((key, i) => (
                <tr className={i % 2 === 0 ? "DarkRow" : ""} key={key}>
                  <td>{key}</td>
                  <td>{this.props.data[key]}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default DataTable