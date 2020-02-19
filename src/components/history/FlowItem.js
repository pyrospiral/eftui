import React from "react";
import PropTypes from "prop-types";
import Endpoint from "../api/endpoint";

class FlowItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { response: "", token: "", status: "" };
  }

  getResult = () => {
    let payload = {
      ft_token: this.state.token
    };
    let response = Endpoint.api.result(payload);
    response.then(res => {
      this.setState({
        response: JSON.stringify(res, null, 2)
      });
    });
  };

  abortTask = () => {
    console.log("Getting result for");
    let payload = {
      ft_token: this.state.token
    };
    let response = Endpoint.api.abort(payload);
    response.then(res => {
      this.setState({
        response: JSON.stringify(res, null, 2)
      });
    });
  };

  componentDidMount() {
    this.setState({ token: this.props.token, status: this.props.status });
  }

  render() {
    return (
      <div className="panel panel--loose panel--raised base-margin-bottom">
        <div>
          <span className="label label--light">{this.state.status}</span>
        </div>
        <div className="base-margin-top">
          <p>{this.state.token}</p>
        </div>
        {this.state.status == "SUCCESS" ? (
          <button className="btn btn--primary" onClick={this.getResult}>
            Get Result
          </button>
        ) : null}
        {this.state.status == "PENDING" ? (
          <button className="btn btn--dark " onClick={this.abortTask}>
            Abort
          </button>
        ) : null}
        <div className="base-margin-top">
          <pre>{this.state.response}</pre>
        </div>
      </div>
    );
  }
}
FlowItem.propTypes = {
  token: PropTypes.string,
  status: PropTypes.string
};
export default FlowItem;
