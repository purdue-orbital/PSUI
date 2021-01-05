import React from 'react';

import ConfirmationPopUp from './ConfirmationPopUp.js';

import './styles/CurrentStatus.css';

const StatusEnum = Object.freeze({
  STARTMISSION: "Waiting to Start",
  UNVERIFIED: "Not Verified",
  VERIFIED: "Verified",
  ABORTED: "Aborted",
});

class CurrentStatus extends React.Component {
  static defaultProps = {
    onMissionStart: null,
    onVerify: null,
    onUnverify: null,
    onAbort: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      status: sessionStorage.getItem("CurrentStatusStorage") || StatusEnum.STARTMISSION,
      confirmWindowOpen: false,
    };
  }

  __changeStatus(newStatus) {
    if (newStatus === this.state.status) {
      return;
    }
    sessionStorage.setItem("CurrentStatusStorage", newStatus);
    this.setState({ status: newStatus });
  }

  __nonblockingConfirmation(message) {
    // FIXME: Couldn't be asked to make this actually nonblocking right now
    this.setState({ confirmWindowOpen: true })
    return true;
  }

  __runIfAble(func) {
    if (typeof func === "function") {
      func();
    }
  }

  __startMission() {
    // TODO: StartMission
    this.__runIfAble(this.props.onMissionStart);
    this.__changeStatus(StatusEnum.UNVERIFIED);
  }

  __verifyLaunch() {
    if (this.__nonblockingConfirmation("You are about to verify the mission")) {
      // TODO: verify the launch
      this.__runIfAble(this.props.onVerify);
      this.__changeStatus(StatusEnum.VERIFIED);
    }
  }

  __unverifyLaunch() {
    if (this.__nonblockingConfirmation("You are about to unverify the mission")) {
      // TODO: unverify the launch
      this.__runIfAble(this.props.onUnverify);
      this.__changeStatus(StatusEnum.UNVERIFIED);
    }
  }

  __abortLaunch() {
    if (this.__nonblockingConfirmation("You are about to abort the mission; This action is irreversable!")) {
      // TODO: abort the launch
      this.__runIfAble(this.props.onAbort);
      this.__changeStatus(StatusEnum.ABORTED);
    }
  }

  __renderActionButtons() {
    const currStatus = this.state.status;

    const startMissionButton = (<button className="StartMissionButton" onClick={() => this.__startMission()}>Start Mission</button>);
    const verifyMissionButton = (<button className="VerifyButton" onClick={() => this.__verifyLaunch()}>Verify</button>);
    const unverifyMissionButton = (<button className="UnverifyButton" onClick={() => this.__unverifyLaunch()}>Unverify</button>);
    const abortMissionButton = (<button className="AbortButton" onClick={() => this.__abortLaunch()}>Abort</button>);

    switch (currStatus) {
      case StatusEnum.STARTMISSION: return startMissionButton;
      case StatusEnum.UNVERIFIED: return (
        <>
          {verifyMissionButton}
          {abortMissionButton}
        </>
      );
      case StatusEnum.VERIFIED: return (
        <>
          {unverifyMissionButton}
          {abortMissionButton}
        </>
      )
      case StatusEnum.ABORTED:
      default: return abortMissionButton;
    }
  }

  render() {
    const currStatus = this.state.status;
    return (
      <div className="CurrentStatusObj">
        <div className="CurrentStatusLabel">Current Status</div>
        <div className="CurrentStatus">{currStatus}</div>
        {this.__renderActionButtons()}
        {this.state.confirmWindowOpen ? <ConfirmationPopUp toggle={() => { this.setState({ confirmWindowOpen: false }) }} /> : null}
      </div>
    )
  }
}

export default CurrentStatus;
