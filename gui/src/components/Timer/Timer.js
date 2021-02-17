import React from 'react';

import './Timer.css';

class Timer extends React.Component {

  static defaultProps = {
    timerName: "Default Timer",
    tick: false,
  };

  constructor(props) {
    super(props);
    this.refTime = sessionStorage.getItem(`${this.props.timerName}_ref`);
    this.state = {
      time: "00:00:00:0"
    };
  }

  __tick() {
    const timeDiff = Date.now() - this.refTime;
    const time = this.__millsToTime(timeDiff);
    this.setState({ time: time });
  }

  __pad_zeros(number) {
    let retString = "";
    if (number < 10) {
      retString = "0" + number;
    } else {
      retString = number + "";
    }
    return retString;
  }

  __millsToTime(milliseconds_diff) {
    let milliseconds = milliseconds_diff % 1000;
    milliseconds = Math.floor(milliseconds / 100);
    let seconds = Math.floor(milliseconds_diff / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    return `${this.__pad_zeros(hours)}:${this.__pad_zeros(minutes)}:${this.__pad_zeros(seconds)}:${milliseconds}`;
  }

  __setRefTime() {
    this.refTime = Date.now();
    sessionStorage.setItem(`${this.props.timerName}_ref`, this.refTime);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.refTime !== null || this.props.tick) {
        if (this.refTime === null) { this.__setRefTime(); }
        this.__tick();
      }
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="TimerContainer">
        <div className="TimerLabelContainer" >
          <div className="TimerLabelElement">
            {this.props.timerName}:
          </div>
        </div>
        <div className="TimerClockContainer">
          <div className="TimerClockElement">
            {this.state.time}
          </div>
        </div>
      </div>
    );
  }
}

export default Timer;
