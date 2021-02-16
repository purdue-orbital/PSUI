import React from 'react';

import './Timer.css';

class Timer extends React.Component {

  static defaultProps = {
    timer_name: "Default Timer",
    tick: false,
  };

  constructor(props) {
    super(props);
    this.start_time = sessionStorage.getItem(`${this.props.timer_name}_start`);
    this.state = {
      time: "00:00:00:0"
    };
  }

  __tick() {
    const now_time = Date.now();
    const time_diff = now_time - this.start_time;

    const time = this.__millsToTime(time_diff);
    this.setState({ time: time });
  }

  __pad_zeros(number) {
    number = number + "";
    if (number < 10) {
      number = "0" + number;
    }
    return number;
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

  __setStartTime() {
    this.start_time = Date.now();
    sessionStorage.setItem(`${this.props.timer_name}_start`, this.start_time);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.start_time !== null || this.props.tick) {
        if (this.start_time === null) { this.__setStartTime(); }
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
            {this.props.timer_name}:
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

