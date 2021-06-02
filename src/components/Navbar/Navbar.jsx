import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";

const Navbar = (props) => {
  return (
    <nav>
      {props.user ? (
        <>
          <Link to={PATHS.HOMEPAGE} className="nav__projectName">
            WELCOME, {props.user.username}
          </Link>
        </>
      ) : (
        <Link to={PATHS.HOMEPAGE} className="nav__projectName">
          WELCOME, want to log in?
        </Link>
      )}

      <div className="nav__authLinks">
        {props.user ? (
          <>
            <Link to={PATHS.PROFILEPAGE} className="profile-link">
              Profile
            </Link>
            <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={PATHS.SIGNUPPAGE} className="authLink">
              Signup
            </Link>
            <Link to={PATHS.LOGINPAGE} className="authLink">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
