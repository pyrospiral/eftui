import React from "react";
import Endpoint from "../api/endpoint";
import FlowEntry from "./FlowEntry";
import StartButton from "./StartButton";
import ResultPane from "./ResultPane";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultText: "Enter an ftriage flow and press start!",
      buttonText: "Start",
      flowval: "ftriage route LEAF:101 -dip 102.13.12.10"
    };
  }

  // Button functionality
  startClick = async () => {
    if (this.state.buttonText !== "Clear") {
      this.setState({ buttonText: "Running..." });

      // Register the apic
      let payload = {
        apics: [
          {
            site: "1",
            ip: "172.21.83.67",
            username: "admin",
            password: "ins3965!",
            islocal: "True"
          }
        ]
      };
      let response = Endpoint.api.register(payload);

      // Start the ftirage

      // payload = {
      //   flow: "route",
      //   ii: "LEAF:101",
      //   dip: "102.13.12.10"
      // };
      // response = Endpoint.api.start(payload);

      response.then(res => {
        this.setState({
          resultText:
            "Result of " +
            this.state.flowval +
            " is \n\n" +
            JSON.stringify(res, null, 2)
        });
        this.setState({ buttonText: "Clear" });
      });
    } else {
      this.setState({ resultText: "Enter an ftriage flow and press start!" });
      this.setState({ buttonText: "Start" });
    }
  };

  //Flow Input
  flowChange = event => {
    this.setState({ flowval: event.target.value });
  };

  render() {
    return (
      <div className="section">
        <FlowEntry flowval={this.state.flowval} flowChange={this.flowChange} />
        <StartButton
          onClick={this.startClick}
          buttonText={this.state.buttonText}
        />
        <ResultPane resultText={this.state.resultText} />
      </div>
    );
  }
}

export default HomePage;
