import React from 'react';

class Timer extends React.Component {
   constructor(props) {
      super(props);
      this.start_time = new Date().getTime()
      this.milliseconds = 0;
      this.seconds = 0;
      this.minutes = 0;
      this.hours = 0;
      this.state = {
         time: 0
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
      let now_time = new Date().getTime();
      let time_diff = now_time - this.start_time;
      this.milliseconds = time_diff % 1000;
      this.milliseconds = Math.floor(this.milliseconds / 100);
      this.seconds = Math.floor(time_diff / 1000);
      this.minutes = Math.floor(this.seconds / 60);
      this.seconds = this.seconds % 60;
      this.hours = Math.floor(this.minutes / 60);
      this.minutes = this.minutes % 60;
      this.setState(state => ({
         time: `${pad_zeros(this.hours)}:${pad_zeros(this.minutes)}:${pad_zeros(this.seconds)}:${this.milliseconds}`
      }));
   }

   componentDidMount() {
      this.interval = setInterval(() => this.tick(), 10);
   }

   componentWillUnmount() {
      clearInterval(this.interval);
   }

   render() {
      return (
         <div>
            {this.props.timer_name}: {this.state.time}
         </div>
      );
   }
}

export default Timer;

