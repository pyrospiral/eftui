import React from "react";
import PropTypes from "prop-types";
import Endpoint from "../api/endpoint";

class FlowItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      token: "",
      status: "",
      cmd: "",
      date: "",
      logsclicked: false,
      resultclicked: false
    };
  }

  getResult = () => {
    if (this.state.resultclicked) {
      this.setState({
        response: "",
        resultclicked: false,
        logsclicked: false
      });
      return;
    }
    let payload = {
      ft_token: this.state.token
    };
    let response = Endpoint.api.result(payload);
    response.then(res => {
      this.setState({
        response: JSON.stringify(res, null, 2),
        resultclicked: true
      });
    });
  };

  getLogs = () => {
    if (this.state.logsclicked) {
      this.setState({
        response: "",
        resultclicked: false,
        logsclicked: false
      });
      return;
    }

    let payload = {
      ft_token: this.state.token
    };
    let response = Endpoint.api.logs(payload);
    response.then(res => {
      this.setState({
        response: res,
        logsclicked: true
      });
    });
  };

  abortTask = () => {
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
    this.setState({
      token: this.props.token,
      status: this.props.status,
      cmd: this.props.cmd,
      date: this.props.date
    });
  }

  render() {
    return (
      <div className="panel panel--loose panel--raised base-margin-bottom">
        <div className="base-margin-bottom">
          {this.state.status == "SUCCESS" && (
            <span className="label label--success">{"SUCCESS"}</span>
          )}
          {this.state.status == "REVOKED" && (
            <span className="label label--light">{"REVOKED"}</span>
          )}
          {this.state.status == "FAILURE" && (
            <span className="label label--light">{"FAILED"}</span>
          )}
          {this.state.status == "PENDING" && (
            <span className="label label--success label--bordered">
              {"PENDING"}
            </span>
          )}
        </div>
        <div className=" row">
          <div className="col-4 col-lg-4 col-xl-4">
            <div className="subheader">Token</div>
            <p>{this.state.token}</p>
          </div>
          <div className="col-4 col-lg-4 col-xl-4">
            <div className="subheader">Command</div>
            <p>{this.state.cmd}</p>
          </div>

          <div className="col-4 col-lg-4 col-xl-4">
            <div className="subheader">Date</div>
            <p>{this.state.date}</p>
          </div>
        </div>

        {this.state.status == "SUCCESS" ? (
          <div>
            <button className="btn btn--primary" onClick={this.getResult}>
              Get Result
            </button>
            <button className="btn btn--primary" onClick={this.getLogs}>
              Get Logs
            </button>
          </div>
        ) : null}
        {this.state.status == "PENDING" ? (
          <button className="btn btn--dark " onClick={this.abortTask}>
            Abort
          </button>
        ) : null}
        {this.state.response != "" && (
          <div className="base-margin-top">
            <pre>{this.state.response}</pre>
          </div>
        )}
      </div>
    );
  }
}
FlowItem.propTypes = {
  token: PropTypes.string,
  status: PropTypes.string,
  cmd: PropTypes.string,
  date: PropTypes.string
};
export default FlowItem;
