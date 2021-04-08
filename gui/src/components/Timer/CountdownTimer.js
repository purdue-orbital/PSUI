import Timer from './Timer';

class CountdownTimer extends Timer {
  static defaultProps = {
    timerName: "Countdown",
    tick: true,
    // endTime must be a parsable string. Check this link for how to format this prop: 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
    endTime: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      timerContainerStyle: "TimerClockContainer TimerClockContainerWithinTime"
    }
  }

  // @override
  componentDidMount() {
    this.refTime = Date.parse(this.props.endTime);
    if (Number.isNaN(this.refTime)) {
      // If the parsed string is bad, just set the timer for 30 secs in the future
      this.refTime = Date.now() + (30 * 1000);
    }
    super.componentDidMount(); // Call super to set up timer interval
  }

  // @override
  __tick() {
    const timeDiff = this.refTime - Date.now();

    if (timeDiff < 0) {
      // Time is past the refTime -> Counting up
      const time = this.__millsToTime(-1 * timeDiff);
      this.setState({
        time: time,
        timerContainerStyle: "TimerClockContainer TimerClockContainerPastTime"
      });
      return
    }
    // Timer is within refTime -> Counting down
    const time = this.__millsToTime(timeDiff);
    this.setState({ time: time });
  }

  // @override
  __setRefTime(_time) {
    // This timer's reference time is set in the constructor
    // It shouldn't change on update of the interval
  }
}

export default CountdownTimer;
