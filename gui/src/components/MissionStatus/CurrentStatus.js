import React from 'react';

import ConfirmationPopUp from '../../utils/ConfirmationPopUp.js';

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

  confirmationOverlay = null;

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

  __nonblockingConfirmation(message, func) {
    this.confirmationOverlay = (
      <ConfirmationPopUp onAccept={() => {
        this.__runIfAble(func);
        this.setState({ confirmWindowOpen: false });
      }} onDecline={() => {
        this.setState({ confirmWindowOpen: false });
      }}>
        {message}
      </ConfirmationPopUp>
    );
    this.setState({ confirmWindowOpen: true });
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
    const currStatus = this.state.status;
    const newStatus = StatusEnum.VERIFIED;

    if (currStatus !== newStatus) {
      this.__nonblockingConfirmation("You are about to verify the mission", () => {
        // TODO: verify the launch
        this.__runIfAble(this.props.onVerify);
        this.__changeStatus(StatusEnum.VERIFIED);
      });
    }
  }

  __unverifyLaunch() {
    const currStatus = this.state.status;
    const newStatus = StatusEnum.UNVERIFIED;

    if (currStatus !== newStatus) {
      this.__nonblockingConfirmation("You are about to unverify the mission", () => {
        // TODO: unverify the launch
        this.__runIfAble(this.props.onUnverify);
        this.__changeStatus(newStatus);
      });
    }
  }

  __abortLaunch() {
    const currStatus = this.state.status;
    const newStatus = StatusEnum.ABORTED;

    if (currStatus !== newStatus) {
      this.__nonblockingConfirmation("You are about to abort the mission; This action is irreversable!", () => {
        // TODO: abort the launch
        this.__runIfAble(this.props.onAbort);
        this.__changeStatus(newStatus);
      });
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
    const isOverlay = this.state.confirmWindowOpen;

    const overaly = this.confirmationOverlay;

    return (
      <div className="CurrentStatusObj">
        <div className="CurrentStatusLabel">Current Status</div>
        <div className="CurrentStatus">{currStatus}</div>
        {this.__renderActionButtons()}
        {isOverlay ? overaly : null}
      </div>
    )
  }
}

export default CurrentStatus;
