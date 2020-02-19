import React from "react";
import PropTypes from "prop-types";
import Endpoint from "../api/endpoint";

import { Steps, Toast } from "cisco-ui-components";

class ResultPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      ft_token: null,
      stepStarted: "inactive",
      stepRunning: "inactive",
      stepCompleted: "inactive",
      stepResult: "inactive",
      warningToast: null
    };
  }

  sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  flowToPayload(flowstr) {
    let flowarray = flowstr.split(" ");
    let payload = {
      flow: flowarray[1]
    };
    for (var i = 2; i < flowarray.length; i = i + 2) {
      payload[flowarray[i].slice(1)] = flowarray[i + 1];
    }
    return payload;
  }

  statusCheck(ft_token) {
    if (ft_token == null || ft_token === "") {
      return;
    }

    // Payload for status request

    let payload = {
      ft_token: ft_token
    };

    // Status request
    let response = Endpoint.api.status(payload);
    response.then(res => {
      this.setState({
        response: JSON.stringify(res, null, 2),
        stepRunning: "active"
      });

      console.log(res);
      // If fttoken is invalid
      if (res.error) {
        this.setState({
          response: res.error,
          warningToast: "Invalid ft_token"
        });
        return;
      }

      // If not succeeded yet
      if (res.status && res.status.includes("PENDING")) {
        this.sleep(5000).then(() => {
          this.statusCheck(ft_token);
        });
      }

      // If failed
      else if (res.status && res.status.includes("FAILURE")) {
        this.setState({
          warningToast: "Request Failed."
        });
      }

      // If succeeds
      else if (res.status && res.status.includes("SUCCESS")) {
        this.setState({
          stepRunning: "visited",
          stepCompleted: "active"
        });
        this.getResult(ft_token);
      }
    });
  }

  getResult(ft_token) {
    // Payload for result request
    let payload = {
      ft_token: ft_token
    };

    // Result request
    let response = Endpoint.api.result(payload);
    response.then(res => {
      this.setState({
        response: JSON.stringify(res, null, 2)
      });

      this.setState({
        stepCompleted: "visited",
        stepResult: "active"
      });

      // If fttoken is invalid
      if (res.error) {
        this.setState({
          response: res.error,
          warningToast: "Error in getting result."
        });
        return;
      }
    });
  }

  // Start ftriage here
  componentDidUpdate(previousProps) {
    // Break condition - Do not rerender if props stay the same
    if (previousProps.flowid == this.props.flowid) {
      return;
    }
    this.setState({
      stepStarted: "active",
      stepRunning: "inactive",
      stepCompleted: "inactive",
      stepResult: "inactive",
      warningToast: null
    });

    let payload = this.flowToPayload(this.props.flow);
    let response = Endpoint.api.start(payload);

    response.then(res => {
      this.setState({
        response: JSON.stringify(res, null, 2),
        ft_token: res.ft_token,
        stepStarted: "visited"
      });

      if (res.message && res.message.includes("Error")) {
        this.setState({
          response: "Errored. Start a new request.",
          warningToast: "Error in starting, check logs!"
        });
      }

      this.statusCheck(res.ft_token);
    });
  }

  render() {
    return (
      <div className="section">
        {this.props.flow !== "" && (
          <>
            <div className="panel panel--loose panel--raised base-margin-bottom">
              <b>{this.props.flow}</b>
              <hr />
              <pre>{this.state.response}</pre>
              <br />
              <div>Token Received : {this.state.ft_token}</div>
              <Steps>
                <Steps.Step
                  state={this.state.stepStarted}
                  icon="1"
                  label="Started"
                />
                <Steps.Step
                  state={this.state.stepRunning}
                  icon="2"
                  label="Running"
                />
                <Steps.Step
                  state={this.state.stepCompleted}
                  icon="3"
                  label="Completed"
                />
                <Steps.Step
                  state={this.state.stepResult}
                  icon="4"
                  label="Parsed"
                />
              </Steps>
            </div>
          </>
        )}
        {this.state.warningToast && (
          <Toast sev="danger" title="Error" message={this.state.warningToast} />
        )}
      </div>
    );
  }
}

ResultPane.propTypes = {
  flow: PropTypes.string,
  flowid: PropTypes.number
};

export default ResultPane;
