import React from 'react';

import ConfirmationPopUp from './UtilComponents/ConfirmationPopUp/ConfirmationPopUp.js';
import MessagePopUp from './UtilComponents/MessagePopUp/MessagePopUp.js';

class PopUpGenerator extends React.Component {
  static defaultProps = {};

  constructor(props, state) {
    // Bare minnimum type checking
    if (new.target === "PopUpGenerator") {
      throw new TypeError("PopUpGenerator should not be instanced directly!!");
    }

    super(props);
    this.state = {
      popUpWindowOpen: false,
      ...state
    }
    this.popUpWindow = null;
  }

  __runFunction(func) {
    if (typeof func === "function") {
      func();
    }
  }

  nonblockingConfirmation(message, onAccept, onDecline) {
    this.popUpWindow = (
      <ConfirmationPopUp
        onAccept={() => {
          this.__runFunction(onAccept);
          this.setState({ popUpWindowOpen: false });
        }}
        onDecline={() => {
          this.__runFunction(onDecline);
          this.setState({ popUpWindowOpen: false });
        }}
      >
        {message}
      </ConfirmationPopUp>
    );
    this.setState({ popUpWindowOpen: true });
  }

  nonblockingMessage(message, onClose) {
    this.popUpWindow = (
      <MessagePopUp
        onClose={() => {
          this.__runFunction(onClose);
          this.setState({ popUpWindowOpen: false });
        }}
      >
        {message}
      </MessagePopUp>
    );
    this.setState({ popUpWindowOpen: true })
  }

  renderPopUp() {
    const isOverlay = this.state.popUpWindowOpen;
    const overlay = this.popUpWindow;
    return isOverlay ? overlay : null;
  }
}

export default PopUpGenerator;
