import React from 'react';

import './ConfirmationPopUp.css'

class ConfirmationPopUp extends React.Component {
  static defaultProps = {
    onAccept: () => { },
    onDecline: () => { },
    isImportant: false,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const isImportant = this.props.isImportant;
    const accept = this.props.onAccept;
    const decline = this.props.onDecline;

    return (
      <div className="modal">
        <div className="modalContent">
          <span className="close" onClick={decline}>
            &times;
          </span>
          {isImportant ? <img src={process.env.PUBLIC_URL + '/img/warning_symbol_in_red.webp'} alt="WARNING!" className="popupImage"/> : null}
          <p className="modalText">{this.props.children}</p>
          <div className="modalActions">
            <button className="PopUpButton" onClick={accept}>Continue</button>
            <button className="PopUpButton" onClick={decline}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmationPopUp;
