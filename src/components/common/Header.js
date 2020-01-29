import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/history" activeStyle={activeStyle}>
        History
      </NavLink>
      {" | "}
      <NavLink to="/help" activeStyle={activeStyle}>
        Help
      </NavLink>
    </nav>
  );
};

export default Header;
