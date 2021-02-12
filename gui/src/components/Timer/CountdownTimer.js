import React from 'react';

import './Timer.css';

class CountdownTimer extends React.Component {
  static defaultProps = {
    timer_name: "Default Countdown",
  };

  constructor(props) {
    super(props);
    this.state = {
      time: "00:00:00:0"
    };
  }

  __millisecsToTime(millisecs) {
  }

  render() {
    const timerName = this.props.timer_name;
    const time = this.state.time;

    return (
      <div className="TimerContainer">
        <div className="TimerLabelContainer" >
          <div className="TimerLabelElement">
            {timerName}:
          </div>
        </div>
        <div className="TimerClockContainer">
          <div className="TimerClockElement">{time}
          </div>
        </div>
      </div>
    );
  }
}

export default CountdownTimer;
