import React from "react";
import PropTypes from "prop-types";

const StartButton = props => (
  <button className="btn btn--primary" onClick={props.onClick}>
    {props.buttonText}
  </button>
);

StartButton.propTypes = {
  buttonText: PropTypes.string,
  onClick: PropTypes.func
};

export default StartButton;
