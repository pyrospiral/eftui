import React from "react";
import PropTypes from "prop-types";

const FlowEntry = props => {
  return (
    <div>
      <h2>Ftriage Capture</h2>
      <hr />
      <div className="section">
        <div className="form-group base-margin-bottom">
          <div className="form-group__text">
            <input
              id="input-type-number"
              type="text"
              value={props.flowval}
              onChange={props.flowChange}
            />
            <label htmlFor="input-type-number">Flow</label>
          </div>
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
