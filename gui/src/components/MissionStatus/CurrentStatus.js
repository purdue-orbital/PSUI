import React from 'react';

import StatusEnum from '../../utils/StatusEnum.js'
import PopUpGenerator from '../../utils/PopUpGenerator.js';

import './CurrentStatus.css';

class CurrentStatus extends PopUpGenerator {
  static defaultProps = {
    onMissionStart: null,
    onVerify: null,
    onUnverify: null,
    onAbort: null,
  }

  confirmationOverlay = null;

  constructor(props) {
    super(props, {
      status: StatusEnum.STARTMISSION,
    });
  }

  getStatus() {
    return this.state.status;
  }

  changeStatus(newStatus) {
    if (newStatus === this.state.status) {
      return;
    }
    this.setState({ status: newStatus });
  }

  reset() {
    this.changeStatus(StatusEnum.STARTMISSION);
  }

  __runIfAble(func) {
    if (typeof func === "function") {
      func();
    }
  }

  __startMission() {
    // TODO: StartMission
    this.__runIfAble(this.props.onMissionStart);
    this.changeStatus(StatusEnum.UNVERIFIED);
  }

  __verifyLaunch() {
    const currStatus = this.state.status;
    const newStatus = StatusEnum.VERIFIED;

    if (currStatus !== newStatus) {
      this.nonblockingConfirmation("You are about to verify the mission", {
        onAccept: () => {
          // TODO: verify the launch
          this.__runIfAble(this.props.onVerify);
          this.changeStatus(StatusEnum.VERIFIED);
        },
      });
    }
  }

  __unverifyLaunch() {
    const currStatus = this.state.status;
    const newStatus = StatusEnum.UNVERIFIED;

    if (currStatus !== newStatus) {
      this.nonblockingConfirmation("You are about to unverify the mission", {
        onAccept: () => {
          // TODO: unverify the launch
          this.__runIfAble(this.props.onUnverify);
          this.changeStatus(newStatus);
        },
      });
    }
  }

  __abortLaunch() {
    const currStatus = this.state.status;
    const newStatus = StatusEnum.ABORTED;

    if (currStatus !== newStatus) {
      this.nonblockingConfirmation("You are about to abort the mission; This action is irreversable!", {
        isImportant: true,
        onAccept: () => {
          // TODO: abort the launch
          this.__runIfAble(this.props.onAbort);
          this.changeStatus(newStatus);
        }
      });
    }
  }

  __renderActionButtons() {
    const currStatus = this.state.status;

    const startMissionButton = (<button className="StatusButton StartButton" onClick={() => this.__startMission()}>Start Mission</button>);
    const verifyMissionButton = (<button className="StatusButton VerifyButton" onClick={() => this.__verifyLaunch()}>Verify</button>);
    const unverifyMissionButton = (<button className="StatusButton UnverifyButton" onClick={() => this.__unverifyLaunch()}>Unverify</button>);
    const abortMissionButton = (<button className="StatusButton AbortButton" onClick={() => this.__abortLaunch()}>Abort</button>);

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
      case StatusEnum.LAUNCHED:
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
        {this.renderPopUp()}
      </div>
    )
  }
}

export default CurrentStatus;
