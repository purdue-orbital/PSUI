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
    this.refTime = Date.parse(this.props.endTime);
    if (Number.isNaN(this.refTime)) {
      // If the parsed string is bad, just set the timer for one hour in the future
      this.refTime = Date.now() + (60 * 60 * 1000);
    }
  }

  // @override
  __tick() {
    const timeDiff = this.refTime - Date.now();
    if (timeDiff < 0) {
      clearInterval(this.interval);
      this.setState({time: "Out of Time"});
      return
    }
    const time = this.__millsToTime(timeDiff);
    this.setState({time: time});
  }
}

export default CountdownTimer;
