import React from 'react';

import './TimerEditPopUp.css'

class TimerEditPopUp extends React.Component {
  static defaultProps = {
    onClose: () => { },
    onAdd: () => { },
    onSub: () => { },
    onSet: () => { },
  };

  constructor(props) {
    super(props);
    this.state = {
      dHours: 0,
      dMinutes: 0,
      dSeconds: 0,
    };
  }

  changeHours = (event) => {
    this.setState({dHours: event.target.value});
    console.log("Changed dHours to " + event.target.value);
  }

  changeMinutes = (event) => {
    this.setState({dMinutes: event.target.value});
    console.log("Changed dMinutes to " + event.target.value);
  }

  changeSeconds = (event) => {
    this.setState({dSeconds: event.target.value});
    console.log("Changed dSeconds to " + event.target.value);
  }

  render() {
    const close = this.props.onClose;
    const add = this.props.onAdd;
    const sub = this.props.onSub;
    const set = this.props.onSet;

    return (
      <div className="modal">
        <div className="modalContent">
          <span className="close" onClick={close}>
            &times;
          </span>
          <p className="modalText">{this.props.children}</p>
          <form>          // TODO: styling!
            <input
              type="number"
              onChange = {this.changeHours}
            />
            <span>:</span>
            <input
              type="number"
              onChange = {this.changeMinutes}
            />
            <span>:</span>
            <input
              type="number"
              onChange = {this.changeSeconds}
            />
          </form>
          <div className="modalActions">
            <button className="PopUpButton" onClick={add}>Add</button>
            <button className="PopUpButton" onClick={sub}>Sub</button>
            <button className="PopUpButton" onClick={set}>Set</button>
          </div>
        </div>
      </div>
    );
  }
}

export default TimerEditPopUp;