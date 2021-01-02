import React from 'react';

import './styles/CurrentStatus.css';
class CurrentStatus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: "Not Verififed",
    };
  }

  __verifyLaunch() {
    // TODO: verify the launch
  }

  __unverifyLaunch() {
    // TODO: unverify the launch
  }

  __abortLaunch() {
    // TODO: abort the launch
  }

  render() {
    return (
      <div className="CurrentStatusObj">
        <div className="CurrentStatusLabel">Current Status</div>
        <div className="CurrentStatus">TODO: Status here</div>
        <button className="VerifyButton">Verify</button>
        <button className="AbortButton">Abort</button>
      </div>
    )
  }
}

export default CurrentStatus;
