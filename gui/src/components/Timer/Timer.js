import React from 'react';

import './Timer.css';

class Timer extends React.Component {

  static defaultProps = {
    timerName: "Default Timer",
    tick: false,
  };

  constructor(props) {
    super(props);
    this.refTime = null;
    this.interval = null;
    this.state = {
      time: "00:00:00:0",
      timerContainerStyle: "TimerClockContainer"
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.interval === null && this.props.tick) { this.__createTickInterval(); }
    else if (this.interval !== null && !this.props.tick) { this.__endTickInterval(); }
  }

  componentWillUnmount() {
    this.__endTickInterval(false);
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

  __setRefTime(time = Date.now()) {
    this.refTime = time;
  }

  __createTickInterval(intervalLen = 100) {
    this.__setRefTime()
    this.interval = setInterval(() => {
      this.__tick();
    }, intervalLen);
  }

  __endTickInterval(resetTime = true) {
    clearInterval(this.interval);
    if (resetTime) { this.setState({ time: "00:00:00:0" }); }
    this.interval = null;
  }

  render() {
    return (
      <div className="TimerContainer">
        <div className="TimerLabelContainer" >
          <div className="TimerLabelElement">
            {this.props.timerName}:
          </div>
        </div>
        <div className={this.state.timerContainerStyle}>
          <div className="TimerClockElement">
            {this.state.time}
          </div>
        </div>
      </div>
    );
  }
}

export default Timer;
