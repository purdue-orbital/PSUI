import Timer from './Timer';

class CountdownTimer extends Timer {
  static defaultProps = {
    timerName: "Countdown",
    tick: true,
    testCountDown: false,
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

  componentDidUpdate(prevProps) {
    if (prevProps) {
      if (this.props.testCountDown !== prevProps.testCountDown) {
        // Test mode changed state, need to re-create ref time
        this.__setRefTime();
      }

      if (this.props.refTime !== prevProps.refTime) {
        this.__setRefTime(this.props.refTime);
      }
    }
    super.componentDidUpdate();
  }

  // @override
  __tick() {
    const timeDiff = this.refTime - Date.now();

    if (timeDiff < 0) {
      // Time is past the refTime -> Counting up
      const time = this.__millsToTime(-1 * timeDiff);
      this.setState({
        time,
        timerContainerStyle: "TimerClockContainer TimerClockContainerPastTime"
      });
      return
    }
    // Timer is within refTime -> Counting down
    const time = this.__millsToTime(timeDiff);
    this.setState({ 
      time,
      timerContainerStyle: "TimerClockContainer TimerClockContainerWithinTime"
    });
  }

  // @override
  __setRefTime(time) {
    if (time) {
      // Time was supplied, set to that
      this.refTime = time;
      return;
    }
    // No time supplied, use the defaults
    const isTest = this.props.testCountDown;
    this.refTime = Date.parse(this.props.endTime);
    if (Number.isNaN(this.refTime)) {
      // If the parsed string is bad
      // set the timer for 10 secs in the future if test mode
      // set an hour in the future if normal
      this.refTime = isTest ? Date.now() + (10 * 1000) : Date.now() + (60 * 60 * 1000);
    }
  }
}

export default CountdownTimer;
