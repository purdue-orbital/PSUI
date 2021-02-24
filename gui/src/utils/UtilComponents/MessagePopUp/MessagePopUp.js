import React from 'react';

import './MessagePopUp.css'

class MessagePopUp extends React.Component {
  static defaultProps = {
    onClose: () => { },
    isImportant: false,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const onClose = this.props.onClose;
    const isImportant = this.props.isImportant

    return (
      <div className="modal">
        <div className="modalContent">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          {isImportant ? <img src={process.env.PUBLIC_URL + '/img/warning_symbol_in_red.webp'} alt="WARNING!" className="popupImage" /> : null}
          <p className="modalText">{this.props.children}</p>
          <div className="modalActions">
            <button className="PopUpButton" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }
}

export default MessagePopUp;
