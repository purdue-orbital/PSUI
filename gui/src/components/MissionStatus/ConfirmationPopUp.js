import React from 'react';

import './styles/ConfirmationPopUp.css'

class ConfirmationPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="modal">
        <div className="modalContent">
          <span className="close" onClick={() => { this.props.toggle(); }}>&times;</span>
          <p>This is some dummy text to go in the pop up window</p>
        </div>
      </div>
    );
  }
}

export default ConfirmationPopUp;
