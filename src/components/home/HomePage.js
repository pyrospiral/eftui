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
      buttonText: "Start"
    };
  }

  // Button functionality
  startClick = async () => {
    if (this.state.buttonText !== "Clear") {
      this.setState({ buttonText: "Running..." });

      let response = Endpoint.api.test();
      response.then(res => {
        this.setState({ resultText: JSON.stringify(res, null, 2) });
      });
      this.setState({ buttonText: "Clear" });
    } else {
      this.setState({ resultText: "" });
      this.setState({ buttonText: "Start" });
    }
  };

  render() {
    return (
      <div className="panel panel--loose panel--raised base-margin-bottom">
        <FlowEntry />
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
