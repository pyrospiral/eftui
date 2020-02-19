import React from "react";
import FlowEntry from "./FlowEntry";
import StartButton from "./StartButton";
import ResultPane from "./ResultPane";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: "Start",
      flowval: "ftriage route -ii LEAF:101 -dip 101.46.2.2",
      flow: "",
      flowid: 0
    };
  }

  // Button functionality
  startClick = async () => {
    if (this.state.buttonText !== "Clear") {
      this.setState({ buttonText: "Running..." });

      // Set flowval as state for resultview
      this.setState({
        flow: this.state.flowval,
        flowid: this.state.flowid + 1
      });
      this.setState({ buttonText: "Start new" });
    } else {
      // Starting display
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
        <ResultPane flow={this.state.flow} flowid={this.state.flowid} />
      </div>
    );
  }
}

export default HomePage;
