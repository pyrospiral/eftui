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
        <div className="base-margin-top">
          <p>{this.state.ip}</p>
          <p>{this.state.siteid}</p>
          <p>{this.state.host}</p>
          <p>{this.state.username}</p>
          <p>{this.state.islocal}</p>
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
  islocal: PropTypes.string
};
export default SiteItem;
