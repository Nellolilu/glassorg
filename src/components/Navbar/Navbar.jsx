import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import logo from "../../images/Logo.png";

const Navbar = (props) => {
  return (
    <nav>
      <div className="header-logo">
        <Link to={PATHS.HOMEPAGE}>
          {" "}
          <img src={logo} className="logo-header" alt="logo" />
        </Link>
      </div>
      {/* <div>
        <Link to={PATHS.HOMEPAGE} className="navLinks">
          About
        </Link>
      </div> */}
      <div>
        {props.user ? (
          <>
            <Link to={PATHS.PROFILEPAGE} className="navLinks purple">
              Profile
            </Link>
            <button className="btn-active" onClick={props.handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={PATHS.SIGNUPPAGE} className="navLinks purple">
              Signup
            </Link>
            <Link to={PATHS.LOGINPAGE}>
              <button className="btn-active" onClick={props.handleLogout}>
                Login
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
