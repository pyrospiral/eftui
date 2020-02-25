import React from "react";
import PropTypes from "prop-types";
import { Toast } from "cisco-ui-components";

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
        <div className="row">
          <div className="col-8 col-lg-8 col-xl-8">
            <div className="subheader">Multisite</div>
            <label className="switch">
              <input
                type="checkbox"
                checked={props.multisite}
                onChange={props.multisiteChange}
              />
              <span className="switch__input"></span>
            </label>
          </div>
          <div className="col-4 col-lg-4 col-xl-4">
            {props.multisite && (
              <Toast
                sev="warning"
                title="Reminder"
                message="Make sure you've registered the sites first!"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

FlowEntry.propTypes = {
  flowval: PropTypes.string,
  flowChange: PropTypes.func,
  multisite: PropTypes.bool,
  multisiteChange: PropTypes.func
};
export default FlowEntry;
