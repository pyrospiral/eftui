import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import HelpPage from "./help/HelpPage";
import HistoryPage from "./history/HistoryPage";
import Navigation from "./common/Navigation";
import PageNotFound from "./PageNotFound";

import "./App.scss";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navigation />
        <div className="content content--alt">
          <div className="container-fluid">
            <div className="app-content-container">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/history" component={HistoryPage} />
                <Route path="/help" component={HelpPage} />
                <Route component={PageNotFound} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
