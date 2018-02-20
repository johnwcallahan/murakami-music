import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, logout } from "redux-implicit-oauth2";

const config = {
  url: "https://accounts.spotify.com/authorize",
  client: "7ee5f70f185645139c74ac5efa7c3bbd",
  redirect: "http://localhost:8080/callback",
  scope: "user-library-read",
  width: 400, // Width (in pixels) of login popup window. Optional, default: 400
  height: 400 // Height (in pixels) of login popup window. Optional, default: 400
};

const Login = ({ isLoggedIn, login, logout }) => {
  if (isLoggedIn) {
    return <button type="button" onClick={logout}>Logout</button>;
  } else {
    return <button type="button" onClick={login}>Login</button>;
  }
};

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: auth.isLoggedIn
});

const mapDispatchToProps = {
  login: () => login(config),
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);