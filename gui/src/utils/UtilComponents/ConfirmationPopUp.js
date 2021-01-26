import React from 'react';

import './styles/ConfirmationPopUp.css'

class ConfirmationPopUp extends React.Component {
  static defaultProps = {
    onAccept: () => { },
    onDecline: () => { },
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const accept = this.props.onAccept;
    const decline = this.props.onDecline;

    return (
      <div className="modal">
        <div className="modalContent">
          <span className="close" onClick={() => { this.props.onDecline(); }}>
            &times;
          </span>
          <p>{this.props.children}</p>
          <button className="PopUpButton" onClick={accept}>Continue</button>
          <button className="PopUpButton" onClick={decline}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default ConfirmationPopUp;
