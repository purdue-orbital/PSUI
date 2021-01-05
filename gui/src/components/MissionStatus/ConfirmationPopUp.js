import React from 'react';

class ConfirmationPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <span className="close" onClick={() => { this.props.toggle(); }}>&times;</span>
        <p>This is some dummy text to go in the pop up window</p>
      </div>
    );
  }
}

export default ConfirmationPopUp;
