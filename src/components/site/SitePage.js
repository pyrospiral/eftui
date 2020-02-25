import React from "react";
import SiteItem from "./SiteItem";
import SiteEntry from "./SiteEntry";
import Endpoint from "../api/endpoint";

import { Loader } from "cisco-ui-components";

class SitePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sitenum: 0,
      sites: [],
      siteval: "site1"
    };
  }

  componentDidMount() {
    this._isMounted = true;

    let response = Endpoint.api.sites();
    response.then(res => {
      let joined = this.state.sites;
      let counter = 0;
      for (const [key, value] of Object.entries(res.reply)) {
        if (value.ip == null) {
          return;
        }

        let newState = {
          id: key,
          host: value.host,
          username: value.username,
          ip: value.ip,
          siteid: value.siteid,
          islocal: value.islocal
        };
        joined = joined.concat(newState);
        counter = counter + 1;
      }
      this.setState({
        sites: joined,
        sitenum: counter
      });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  //Flow Input
  siteChange = event => {
    this.setState({ siteval: event.target.value });
  };

  render() {
    const siteItems = this.state.sites.map(item => (
      <SiteItem
        key={item.id}
        ip={item.ip}
        siteid={item.siteid}
        host={item.host}
        username={item.username}
        islocal={item.islocal}
      />
    ));

    const loader = (
      <>
        <div className="row">
          <div className="col-md-12 flex-center panel">
            <p>Ftriage sites registered in the past will show up here.</p>
            <Loader type="spinner" color="indigo" />
          </div>
        </div>
      </>
    );

    return (
      <div>
        <div className="section">
          <h2>Sites</h2>
          <hr />

          <SiteEntry
            siteval={this.state.siteval}
            siteChange={this.siteChange}
          />
          {this.state.sitenum > 0 ? siteItems : loader}
        </div>
      </div>
    );
  }
}

export default SitePage;
