import React from "react";
import * as PATHS from "../../utils/paths";
import { Link } from "react-router-dom";
import logo from "../../images/Logo-w.png";

export default function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="header-logo">
          <Link to={PATHS.HOMEPAGE}>
            {" "}
            <img src={logo} className="logo-header" alt="logo" />
          </Link>
        </div>
        <div className="footer-links">
          <p>About</p>
          <p>Login </p>
          <p>Imprint</p>
          <p>Legal Notice</p>
        </div>
      </div>
    </div>
  );
}
