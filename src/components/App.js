import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import HelpPage from "./help/HelpPage";
import HistoryPage from "./history/HistoryPage";
import SideMenu from "./common/SideMenu";
import PageNotFound from "./PageNotFound";

import "./App.scss";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app-container">
          <SideMenu />
          <div className="app-content-container">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/history" component={HistoryPage} />
              <Route path="/help" component={HelpPage} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
