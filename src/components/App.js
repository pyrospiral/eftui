import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import HelpPage from "./help/HelpPage";
import SitePage from "./site/SitePage";
import HistoryPage from "./history/HistoryPage";
import SideMenu from "./common/SideMenu";

import "./App.scss";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app-container">
          <div className="row">
            <div className="col-2 col-lg-2 col-xl-2">
              <SideMenu />
            </div>
            <div className="col-9 col-lg-9 col-xl-9 base-margin-right ">
              <div id="app-view" className="app-content-container">
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/history" component={HistoryPage} />
                  <Route path="/sites" component={SitePage} />
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
