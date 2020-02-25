import React from "react";
import PropTypes from "prop-types";

const FlowEntry = props => {
  return (
    <div>
      <h2>Ftriage Capture</h2>
      <hr />
      <div className="panel panel--loose panel--raised base-margin-bottom section">
        <div className="form-group base-margin-bottom">
          <div className="form-group__text">
            <input
              id="flow"
              type="text"
              value={props.flowval}
              onChange={props.flowChange}
            />
            <label htmlFor="flow">Flow</label>
          </div>
        </div>
        <div className="form-group base-margin-bottom row">
          <div className="form-group__text select">
            <select id="type">
              <option value="first">Route</option>
              <option value="second">Bridge</option>
            </select>
            <label htmlFor="type">Flow Presets</label>
          </div>
        </div>
        <div>
          <div className="subheader">Multisite</div>
          <label className="switch">
            <input type="checkbox" />
            <span className="switch__input"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

FlowEntry.propTypes = {
  flowval: PropTypes.string,
  flowChange: PropTypes.func
};
export default FlowEntry;
