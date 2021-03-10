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
      // FIXME: Lowering this to 30 seconds for dev purposes, put back when done
      this.refTime = Date.now() + (30 * 1000);
    }
  }

  // @override
  __tick() {
    const timeDiff = this.refTime - Date.now();
    
    if (timeDiff < 0) {
      // FIXME: Right now this identifies when time is out and simply stops the imer from ticking
      // Ideally should start counting up and perhaps change the timer/text color
      // Check Parent class timer for more deatils
      /*clearInterval(this.interval);
      this.setState({time: "Out of Time"});*/
      const time = this.__millsToTime(-1 * timeDiff);
      this.setState({time: time});
      return
    }
    const time = this.__millsToTime(timeDiff);
    this.setState({time: time});
  }
}

export default CountdownTimer;
