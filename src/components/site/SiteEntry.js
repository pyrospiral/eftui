import React from "react";
import PropTypes from "prop-types";
import Endpoint from "../api/endpoint";

class SiteEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siteid: 1,
      type: "",
      username: "admin",
      password: "password",
      hostname: "ifs1-ifc1",
      address: "172.12.31.42",
      registered: "Submit"
    };
  }
  onSubmit = () => {
    let payload = {
      apics: [
        {
          ip: this.state.address,
          host: this.state.hostname,
          username: this.state.username,
          password: this.state.password,
          site: this.state.siteid
        }
      ]
    };
    let response = Endpoint.api.register(payload);

    response.then(res => {
      this.setState({
        response: JSON.stringify(res, null, 2),
        registered: "Registered"
      });
    });
  };

  onChange = e => this.setState({ [e.target.id]: e.target.value });

  render() {
    return (
      <div className="panel panel--loose panel--raised base-margin-bottom">
        Register a new Site
        <hr></hr>
        <div className="row">
          <div className=" col-4 col-lg-4 col-xl-4">
            <div className="form-group base-margin-bottom">
              <div className="form-group__text select">
                <select id="type">
                  <option value="first">APIC Site</option>
                  <option value="second">MSO</option>
                </select>
                <label htmlFor="type">Type</label>
              </div>
            </div>
          </div>
          <div className=" col-4 col-lg-4 col-xl-4">
            <div className="form-group base-margin-bottom">
              <div className="form-group__text">
                <input
                  id="siteid"
                  type="number"
                  value={this.state.siteid}
                  onChange={this.onChange}
                />
                <label htmlFor="siteid">Site ID</label>
              </div>
            </div>
          </div>
          <div className=" col-4 col-lg-4 col-xl-4">
            <div className="form-group base-margin-bottom">
              <div className="form-group__text">
                <input
                  id="address"
                  type="text"
                  value={this.state.address}
                  onChange={this.onChange}
                />
                <label htmlFor="address">Address</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4 col-lg-4 col-xl-4">
            <div className="form-group base-margin-bottom">
              <div className="form-group__text">
                <input
                  id="username"
                  type="text"
                  value={this.state.username}
                  onChange={this.onChange}
                />
                <label htmlFor="username">Username</label>
              </div>
            </div>
          </div>
          <div className="col-4 col-lg-4 col-xl-4">
            <div className="form-group base-margin-bottom">
              <div className="form-group__text">
                <input
                  id="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="col-4 col-lg-4 col-xl-4">
            <div className="form-group base-margin-bottom">
              <div className="form-group__text">
                <input
                  id="hostname"
                  type="text"
                  value={this.state.hostname}
                  onChange={this.onChange}
                />
                <label htmlFor="hostname">Hostname</label>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn--primary" onClick={this.onSubmit}>
          {this.state.registered}
        </button>
      </div>
    );
  }
}

SiteEntry.propTypes = {
  siteval: PropTypes.string,
  siteChange: PropTypes.func,
  siteusername: PropTypes.string,
  sitepassword: PropTypes.string,
  sitehostname: PropTypes.string,
  siteaddress: PropTypes.string
};
export default SiteEntry;
