import React from 'react';


class GenericIndicator extends React.Component {
  static defaultProps = {
    name: "Un-nammed Indicator",
    data: " ¯\\_(ツ)_/¯"
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = this.props.data;
    const displayVal = typeof(data) === "boolean" ?  data === true ? "Online" : "Offline" : this.props.data;
    return (
      <div>
        <div>{this.props.name}</div>
        <div>{displayVal}</div>
      </div>
    );
  }
}


export default GenericIndicator;