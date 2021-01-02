import React from 'react';

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
        <div>Current Status</div>
        <div>TODO: Status here</div>
        <button>Verify</button>
        <button>Abort</button>
      </div>
    )
  }
}

export default CurrentStatus;
