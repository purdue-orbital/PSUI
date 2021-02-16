import Timer from './Timer';

class CountdownTimer extends Timer {
  static defaultProps = {
    timerName: "Countdown",
    tick: true,
  };
}

export default CountdownTimer;
