import React from 'react';

import './TimerEditPopUp.css'

class TimerEditPopUp extends React.Component {
  static defaultProps = {
    // TODO: maybe figure out events?
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
    (event.target.value !== "") ? this.setState({dHours: event.target.value}) : this.setState({dHours: 0});
    console.log(`Changed dHours to ${this.state.dHours}`);  // Log is one update behind somehow...
  }

  changeMinutes = (event) => {
    (event.target.value !== "") ? this.setState({dMinutes: event.target.value}) : this.setState({dMinutes: 0});
    console.log(`Changed dMinutes to ${this.state.dMinutes}`);  // Log is one update behind somehow...
  }

  changeSeconds = (event) => {
    (event.target.value !== "") ? this.setState({dSeconds: event.target.value}) : this.setState({dSeconds: 0});
    console.log(`Changed dSeconds to ${this.state.dSeconds}`);  // Log is one update behind somehow...
  }

  render() {
    const close = this.props.onClose;
    const add = this.props.onAdd;
    const sub = this.props.onSub;
    const set = this.props.onSet;

    // TODO: styling!

    return (
      <div className="modal">
        <div className="modalContent">
          <span className="close" onClick={close}>
            &times;
          </span>
          <p className="modalText">{this.props.children}</p>
          <form>
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
            <button className="PopUpButton" onClick= {
              () => add(1000 * (3600 * parseInt(this.state.dHours) + 60 * parseInt(this.state.dMinutes) + parseInt(this.state.dSeconds)))
            }>Add</button>
            <button className="PopUpButton" onClick={
              () => sub(1000 * (3600 * parseInt(this.state.dHours) + 60 * parseInt(this.state.dMinutes) + parseInt(this.state.dSeconds)))
            }>Sub</button>
            <button className="PopUpButton" onClick={
              () => set(1000 * (3600 * parseInt(this.state.dHours) + 60 * parseInt(this.state.dMinutes) + parseInt(this.state.dSeconds)))
            }>Set</button>
          </div>
        </div>
      </div>
    );
  }
}

export default TimerEditPopUp;