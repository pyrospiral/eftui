import React from "react";
import PropTypes from "prop-types";
import Endpoint from "../api/endpoint";

class ResultPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      ft_token: null
    };
  }

  sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  statusCheck(ft_token) {
    // Payload for status request
    let payload = {
      ft_token: ft_token
    };

    // Status request
    let response = Endpoint.api.status(payload);
    response.then(res => {
      this.setState({
        response: JSON.stringify(res, null, 2)
      });

      console.log(res);
      // If fttoken is invalid
      if (res.message && res.message.includes("Invalid")) {
        this.setState({
          response: "Errored. Start a new request."
        });
        return;
      }

      // If not succeeded yet
      if (res.status && res.status.includes("PENDING")) {
        this.sleep(5000).then(() => {
          this.statusCheck(ft_token);
        });
      }

      // If succeeds
      if (res.status && res.status.includes("SUCCESS")) {
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

      console.log(res);
      // If fttoken is invalid
      if (res.message && res.message.includes("Invalid")) {
        this.setState({
          response: "Errored. Start a new request."
        });
        return;
      }

      // If succeeds
      if (res.status && res.status.includes("SUCCESS")) {
        this.getResult(ft_token);
      }
    });
  }

  componentDidUpdate(previousProps) {
    // Break condition - Do not rerender if props stay the same
    if (previousProps == this.props) {
      return;
    }

    let payload = {
      flow: "route",
      ii: "LEAF:101",
      dip: "102.13.12.10"
    };
    let response = Endpoint.api.start(payload);

    response.then(res => {
      this.setState({
        response: JSON.stringify(res, null, 2),
        ft_token: res.ft_token
      });
      this.statusCheck(res.ft_token);
    });
  }

  render() {
    return (
      <div className="section">
        {this.props.flow !== "" && (
          <>
            <div>Query : {this.props.flow}</div>
            <div>JSON Result : {this.state.response}</div>
            <div>Token Received : {this.state.ft_token}</div>
          </>
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
