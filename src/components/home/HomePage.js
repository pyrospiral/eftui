import React from "react";
import api from "../common/api";
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

  startClick = async () => {
    this.setState({ buttonText: "Running..." });

    let response = api.get(
      "https://ifs1-ifc1.insieme.local/api/class/aaaUser.json",
      true
    );
    response.then(res => {
      console.log(res.data);
      this.setState({ resultText: JSON.stringify(res.data, null, 2) });
    });

    this.setState({ buttonText: "Done!" });
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
