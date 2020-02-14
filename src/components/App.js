import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import HelpPage from "./help/HelpPage";
import HistoryPage from "./history/HistoryPage";
import SideMenu from "./common/SideMenu";

import "./App.scss";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app-container">
          <div className="row">
            <div className="col-1 col-lg-1 col-xl-1 dbl-margin-top">
              <SideMenu />
            </div>
            <div className="col-11 col-lg-11 col-xl-11">
              <div id="app-view" className="app-content-container">
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/history" component={HistoryPage} />
                  <Route path="/help" component={HelpPage} />
                  <Route component={HomePage} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
