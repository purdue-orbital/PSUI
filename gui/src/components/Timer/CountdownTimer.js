import Timer from './Timer';

class CountdownTimer extends Timer {
  static defaultProps = {
    timer_name: "Countdown",
  };

  constructor(props) {
    super(props);
  }
}

export default CountdownTimer;
