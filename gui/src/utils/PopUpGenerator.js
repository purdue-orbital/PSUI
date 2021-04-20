import React from 'react';

import ConfirmationPopUp from './UtilComponents/ConfirmationPopUp/ConfirmationPopUp.js';
import MessagePopUp from './UtilComponents/MessagePopUp/MessagePopUp.js';
import TimerEditPopUp from './UtilComponents/TimerEditPopUp/TimerEditPopUp.js';

class PopUpGenerator extends React.Component {
  static defaultProps = {};

  constructor(props, state) {
    // Bare minimum type checking
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
      func()
    }
  }

  nonblockingConfirmation(message, options) {
    if (options === undefined) { options = {}; }
    if (options.onAccept === undefined) { options.onAccept = null; }
    if (options.onDecline === undefined) { options.onDecline = null; }
    if (options.isImportant === undefined) { options.isImportant = false; }

    this.popUpWindow = (
      <ConfirmationPopUp
        onAccept={() => {
          this.__runFunction(options.onAccept);
          this.setState({ popUpWindowOpen: false });
        }}
        onDecline={() => {
          this.__runFunction(options.onDecline);
          this.setState({ popUpWindowOpen: false });
        }}
        isImportant={options.isImportant}
      >
        {message}
      </ConfirmationPopUp>
    );
    this.setState({ popUpWindowOpen: true });
  }

  nonblockingMessage(message, options) {
    if (options === undefined) { options = {}; }
    if (options.onClose === undefined) { options.onClose = null; }
    if (options.isImportant === undefined) { options.isImportant = false; }

    this.popUpWindow = (
      <MessagePopUp
        onClose={() => {
          this.__runFunction(options.onClose);
          this.setState({ popUpWindowOpen: false });
        }}
        isImportant={options.isImportant}
      >
        {message}
      </MessagePopUp>
    );
    this.setState({ popUpWindowOpen: true })
  }

  timerEditor(message, onAdd, onSub, onSet) {     // This should probably be made a LOT more generic in the future
    this.popUpWindow = (
      <TimerEditPopUp
        onClose = {() => {
          this.setState({ popUpWindowOpen: false });
        }}

        onAdd = {onAdd}
        onSub = {onSub}
        onSet = {onSet}
      >
        {message}
      </TimerEditPopUp>
    );
    this.setState({ popUpWindowOpen: true })
  }

  renderPopUp() {
    // This method must be included in the render method of 
    // the component extending the PopUpGenerator
    const isOverlay = this.state.popUpWindowOpen;
    const overlay = this.popUpWindow;
    return isOverlay ? overlay : null;
  }
}

export default PopUpGenerator;
