import React from "react";

const FlowEntry = () => {
  return (
    <div>
      <h2 className="subtitle">Flow Entry</h2>
      <hr />
      <div className="section">
        <div className="form-group base-margin-bottom">
          <div className="form-group__text">
            <input
              id="input-type-number"
              type="text"
              defaultValue="ftriage route LEAF:101 -dip 102.13.12.10"
            />
            <label htmlFor="input-type-number">Flow</label>
          </div>
        </div>
        {/* <div className="form-group base-margin-bottom">
          <div className="form-group__text">
            <input id="input-type-telephone" type="tel" value="8675309" />
            <label htmlFor="input-type-telephone">Telephone</label>
          </div>
        </div>
        <div className="form-group base-margin-bottom">
          <div className="form-group__text">
            <input
              id="input-type-url"
              type="url"
              value="http://www.cisco.com"
            />
            <label htmlFor="input-type-url">URL</label>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FlowEntry;
