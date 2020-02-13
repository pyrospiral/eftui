import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav className="header" id="styleguideheader" role="navigation">
      <div className="container-fluid">
        <div className="header-panels">
          <div className="header-panel header-panel--left hidden-md-down">
            <NavLink
              className="header-item"
              to="/"
              activeStyle={activeStyle}
              exact
            >
              Home
            </NavLink>
            <NavLink
              className="header-item"
              to="/history"
              activeStyle={activeStyle}
            >
              History
            </NavLink>
            <NavLink
              className="header-item"
              to="/help"
              activeStyle={activeStyle}
            >
              Help
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
