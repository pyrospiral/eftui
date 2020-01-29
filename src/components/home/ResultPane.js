import React from "react";
import PropTypes from "prop-types";

const ResultPane = props => (
  <div className="section">
    <p>{props.resultText}</p>
  </div>
);

ResultPane.propTypes = {
  resultText: PropTypes.string
};

export default ResultPane;
