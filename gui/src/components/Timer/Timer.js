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
    this.milliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.state = {
      time: "00:00:00:0"
    };
  }

  tick() {
    const pad_zeros = (number) => {
      number = number + "";
      if (number < 10) {
        number = "0" + number;
      }
      return number
    }

    let now_time = Date.now();
    let time_diff = now_time - this.start_time;

    this.milliseconds = time_diff % 1000;
    this.milliseconds = Math.floor(this.milliseconds / 100);
    this.seconds = Math.floor(time_diff / 1000);
    this.minutes = Math.floor(this.seconds / 60);
    this.seconds = this.seconds % 60;
    this.hours = Math.floor(this.minutes / 60);
    this.minutes = this.minutes % 60;

    const time = `${pad_zeros(this.hours)}:${pad_zeros(this.minutes)}:${pad_zeros(this.seconds)}:${this.milliseconds}`;
<<<<<<< HEAD
    this.setState({ time: time });
=======
    this.setState({ time: time});
>>>>>>> 637bcf148b2643f306fa08bca266efb9e8b2ac19
  }

  setStartTime() {
    this.start_time = Date.now();
    sessionStorage.setItem(`${this.props.timer_name}_start`, this.start_time);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.start_time != null || this.props.tick) {
        if (this.start_time == null) { this.setStartTime(); }
        this.tick();
      }
    }, 10);
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
          <div className="TimerClockElement">{this.state.time}
          </div>
        </div>
      </div>
    );
  }
}

export default Timer;

