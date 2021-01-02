import React from 'react';

import './styles/CurrentStatus.css';

const StatusEnum = Object.freeze({
  UNVERIFIED: "Not Verified",
  VERIFIED: "Verified",
  ABORTED: "Aborted",
});

class CurrentStatus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: StatusEnum.UNVERIFIED,
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
    const currStatus = this.state.status;
    return (
      <div className="CurrentStatusObj">
        <div className="CurrentStatusLabel">Current Status</div>
        <div className="CurrentStatus">{currStatus}</div>
        <button className="VerifyButton">Verify</button>
        <button className="AbortButton">Abort</button>
      </div>
    )
  }
}

export default CurrentStatus;
