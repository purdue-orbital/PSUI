import React from 'react';

import './MessagePopUp.css'

class MessagePopUp extends React.Component {
  static defaultProps = {
    onClose: () => { },
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const onClose = this.props.onClose;

    return (
      <div className="modal">
        <div className="modalContent">
          <span className="close" onClick={onClose}>
            &times;
          </span>
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
