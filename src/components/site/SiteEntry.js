import React from "react";
import PropTypes from "prop-types";

const SiteEntry = props => {
  return (
    <div>
      <div className="section">
        <div className="form-group base-margin-bottom">
          <div className="form-group__text">
            <input
              id="siteid"
              type="text"
              value={props.siteval}
              onChange={props.siteChange}
            />
            <label htmlFor="siteid">Site ID</label>
            <input
              id="username"
              type="text"
              value={props.siteusername}
              onChange={props.siteChange}
            />
            <label htmlFor="username">Username</label>
            <input
              id="pass"
              type="text"
              value={props.sitepassword}
              onChange={props.siteChange}
            />
            <label htmlFor="pass">Password</label>
            <input
              id="address"
              type="text"
              value={props.siteaddress}
              onChange={props.siteChange}
            />
            <label htmlFor="address">Address</label>
            <input
              id="hostname"
              type="text"
              value={props.sitehostname}
              onChange={props.siteChange}
            />
            <label htmlFor="hostname">Name</label>
          </div>
        </div>
      </div>
    </div>
  );
};

SiteEntry.propTypes = {
  siteval: PropTypes.string,
  siteChange: PropTypes.func,
  siteusername: PropTypes.string,
  sitepassword: PropTypes.string,
  sitehostname: PropTypes.string,
  siteaddress: PropTypes.string
};
export default SiteEntry;
