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
      status: sessionStorage.getItem("CurrentStatusStorage") || StatusEnum.UNVERIFIED,
    };
  }

  __changeStatus(newStatus) {
    if (newStatus === this.state.status) {
      return;
    }
    sessionStorage.setItem("CurrentStatusStorage", newStatus);
    this.setState({status: newStatus});
    console.log(newStatus);
  }

  __verifyLaunch() {
    // TODO: verify the launch
    this.__changeStatus(StatusEnum.VERIFIED);
  }

  __unverifyLaunch() {
    // TODO: unverify the launch
    this.__changeStatus(StatusEnum.UNVERIFIED);
  }

  __abortLaunch() {
    // TODO: abort the launch
    this.__changeStatus(StatusEnum.ABORTED);;
  }

  render() {
    const currStatus = this.state.status;
    return (
      <div className="CurrentStatusObj">
        <div className="CurrentStatusLabel">Current Status</div>
        <div className="CurrentStatus">{currStatus}</div>
        <button className="VerifyButton" onClick={() => this.__verifyLaunch()}>Verify</button>
        <button className="AbortButton" onClick={() => this.__abortLaunch()}>Abort</button>
      </div>
    )
  }
}

export default CurrentStatus;
