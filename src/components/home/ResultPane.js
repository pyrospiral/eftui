import React from "react";
import PropTypes from "prop-types";
import Endpoint from "../api/endpoint";

import { Steps, Toast } from "cisco-ui-components";

class ResultPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      ftresult: "",
      ft_token: null,
      stepStarted: "inactive",
      stepRunning: "inactive",
      stepCompleted: "inactive",
      stepResult: "inactive",
      gettinglogs: false,
      warningToast: null
    };
  }

  sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  flowToPayload(flowstr, multisite) {
    let flowarray = flowstr.split(" ");
    let payload = {
      flow: flowarray[1],
      is_multi: multisite
    };
    for (var i = 2; i < flowarray.length; i = i + 2) {
      payload[flowarray[i].slice(1)] = flowarray[i + 1];
    }
    return payload;
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

    let payload = this.flowToPayload(this.props.flow, this.props.multisite);
    let response = Endpoint.api.start(payload);

    response.then(res => {
      this.setState({
        ftresult: JSON.stringify(res, null, 2),
        ft_token: res.ft_token,
        stepStarted: "visited"
      });

      if (res.message && res.message.includes("Error")) {
        this.setState({
          response: "Errored. Start a new request.",
          warningToast: "Error in starting, check logs!"
        });
      }

      //this.statusCheck(res.ft_token);
      this.pollStatusCheck(res.ft_token);
    });
  }

  pollStatusCheck(ft_token) {
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
          this.pollStatusCheck(ft_token);
        });
        this.pollLog(ft_token);
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

  pollLog(ft_token) {
    console.log("getting logs");

    let payload = {
      ft_token: ft_token,
      lines: 10
    };

    // Status request
    let response = Endpoint.api.logs(payload);
    response.then(res => {
      this.setState({
        ftresult: this.parseLog(res),
        stepRunning: "active"
      });
    });
  }

  // Removing to avoid using sse
  // statusCheck(ft_token) {
  //   if (ft_token == null || ft_token === "") {
  //     return;
  //   }

  //   // Payload for status request
  //   let payload = {
  //     ft_token: ft_token
  //   };

  //   // Status stream request
  //   let response = Endpoint.api.statusstream(payload);
  //   response.then(reader => {
  //     this.parseStatusReader(reader, ft_token);
  //     this.setState({
  //       stepRunning: "active"
  //     });
  //   });
  // }

  // async parseStatusReader(reader, ft_token) {
  //   // eslint-disable-next-line no-constant-condition
  //   while (true) {
  //     const { done, value } = await reader.read();

  //     if (done) {
  //       break;
  //     }
  //     let result = new TextDecoder("utf-8").decode(value);
  //     let resultObject = JSON.parse(result);
  //     this.setState({
  //       response: "Status: " + resultObject.status
  //     });

  //     // If fttoken is invalid
  //     if (resultObject.error) {
  //       this.setState({
  //         response: resultObject.error,
  //         warningToast: "Invalid ft_token"
  //       });
  //       break;
  //     }

  //     // If failed
  //     else if (resultObject.status && resultObject.status.includes("FAILURE")) {
  //       this.setState({
  //         warningToast: "Request Failed."
  //       });
  //       break;
  //     }

  //     // If pending - start logging
  //     else if (resultObject.status && resultObject.status.includes("PENDING")) {
  //       if (!this.state.gettinglogs) {
  //         this.getLog(ft_token);
  //       }
  //       continue;
  //     }

  //     // If succeeds - get result
  //     else if (resultObject.status && resultObject.status.includes("SUCCESS")) {
  //       this.setState({
  //         stepRunning: "visited",
  //         stepCompleted: "active",
  //         gettinglogs: false
  //       });
  //       this.getResult(ft_token);
  //       break;
  //     }
  //   }
  // }

  // getLog(ft_token) {
  //   // Payload for result request
  //   let payload = {
  //     ft_token: ft_token
  //   };

  //   // Status stream request
  //   this.setState({
  //     gettinglogs: true
  //   });
  //   let response = Endpoint.api.logstream(payload);
  //   response.then(reader => {
  //     this.parseLogReader(reader, ft_token);
  //   });
  // }

  // async parseLogReader(reader) {
  //   // eslint-disable-next-line no-constant-condition
  //   while (true) {
  //     const { done, value } = await reader.read();

  //     if (done) {
  //       break;
  //     }
  //     let result = new TextDecoder("utf-8").decode(value);
  //     result = this.parseLog(result);
  //     if (!result) {
  //       continue;
  //     }
  //     this.setState({
  //       ftresult: result
  //     });
  //   }
  // }

  parseLog(logstring) {
    try {
      let logobject = JSON.parse(logstring);
      return logobject.reply;
    } catch {
      return null;
    }
  }

  getResult(ft_token) {
    console.log("Getting result");
    // Payload for result request
    let payload = {
      ft_token: ft_token
    };

    // Result request
    let response = Endpoint.api.result(payload);
    response.then(res => {
      console.log(res);
      this.setState({
        ftresult: JSON.stringify(res, null, 2)
      });

      this.setState({
        stepCompleted: "visited",
        stepResult: "active"
      });

      // If fttoken is invalid
      if (res.error) {
        this.setState({
          ftresult: res.error,
          warningToast: "Error in getting result."
        });
        return;
      }
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
              {this.state.response != "" && (
                <span className="label label--info">{this.state.response}</span>
              )}

              {this.state.ftresult != "" && (
                <div className="panel panel--light base-margin-top">
                  <pre>{this.state.ftresult}</pre>
                </div>
              )}

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
                  label="Result Ready"
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
  flowid: PropTypes.number,
  multisite: PropTypes.bool
};

export default ResultPane;
