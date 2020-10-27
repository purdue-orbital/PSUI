import React from 'react';

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderTableRows() {
    for (const label in this.props.data) {
      console.log(`${label} with val ${this.props.data[label]}`);
      return (
        <tr>
          <td>{label}</td>
          <td>{this.props.data[label]}</td>
        </tr>
      );
    }
  }

  render() {
    this.renderTableRows()
    return (
      <div>
        <table>
          <tbody>
            {
              Object.keys(this.props.data).map((key, i) => (
                  <tr key={key}>
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