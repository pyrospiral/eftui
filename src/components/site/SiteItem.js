import React from "react";
import PropTypes from "prop-types";

class SiteItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: "",
      siteid: "",
      host: "",
      username: "",
      islocal: ""
    };
  }

  componentDidMount() {
    this.setState({
      ip: this.props.ip,
      siteid: this.props.siteid,
      host: this.props.host,
      username: this.props.username,
      islocal: this.props.islocal
    });
  }

  render() {
    return (
      <div className="panel panel--loose panel--raised base-margin-bottom">
        <div className="base-margin-top row">
          <div className="col-2 col-lg-2 col-xl-2">
            <div className="subheader">Site ID</div>
            <span className="label label--info">{this.state.siteid}</span>
          </div>
          <div className="col-2 col-lg-2 col-xl-2">
            <div className="subheader">Address</div>
            <p>{this.state.ip}</p>
          </div>
          <div className="col-2 col-lg-2 col-xl-2">
            <div className="subheader">Hostname</div>
            <p>{this.state.host}</p>
          </div>
          <div className="col-2 col-lg-2 col-xl-2">
            <div className="subheader">Username</div>
            <p>{this.state.username}</p>
          </div>
        </div>
      </div>
    );
  }
}
SiteItem.propTypes = {
  ip: PropTypes.string,
  siteid: PropTypes.string,
  host: PropTypes.string,
  username: PropTypes.string,
  islocal: PropTypes.bool
};
export default SiteItem;
