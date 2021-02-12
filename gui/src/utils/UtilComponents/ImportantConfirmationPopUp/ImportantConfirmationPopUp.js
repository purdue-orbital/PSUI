import React from 'react';

import './ImportantConfirmationPopUp.css'

class ImportantConfirmationPopUp extends React.Component {
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
          <span className="close" onClick={decline}>
            &times;
          </span>
          <img src={process.env.PUBLIC_URL + '/img/warning_symbol_in_red.webp'} alt="WARNING!" className="popupImage"/>
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

export default ImportantConfirmationPopUp;
