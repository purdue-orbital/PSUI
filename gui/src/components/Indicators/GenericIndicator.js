import React from 'react';


class GenericIndicator extends React.Component {
  static defaultProps = {
    name: "Un-nammed Indicator",
    displayVal: " ¯\\_(ツ)_/¯"
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <div>{this.props.displayVal}</div>
      </div>
    );
  }
}


export default GenericIndicator;