import React from "react";
import PropTypes from "prop-types";

const ResultPane = props => (
  <div className="section">
    <div>
      <pre>{props.resultText}</pre>
    </div>
  </div>
);

ResultPane.propTypes = {
  resultText: PropTypes.string
};

export default ResultPane;
