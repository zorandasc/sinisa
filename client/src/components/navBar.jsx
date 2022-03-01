import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import UserContext from "../context/userContext";
import logo from "../logo.svg";

const NavBar = () => {
  const userContext = useContext(UserContext);
  let user = userContext.user ? userContext.user.username : "";

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
      <Link className="navbar-brand px-2" to="/">
        <img src={logo} className="App-logo" alt="logo" />
      </Link>
      <div className="navbar-nav container-fluid">
        <NavLink className="nav-item nav-link link-info" to="/users">
          Users
        </NavLink>
        <div className="d-flex">
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink
                style={{ color: "#61dafb" }}
                className="nav-item nav-link"
                to="/profile"
              >
                <i className="fa fa-smile-o fa-lg" aria-hidden="true"></i>{" "}
                {user}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
