import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "redux-implicit-oauth2";
import { openModal, loginToSpotify } from "../actions";

const SpotifySettings = ({spotifySettingsToggled, isLoggedIn, login, logout, openModal}) => {

  let settingsClassName = spotifySettingsToggled
  ? "opened"
  : "";

  if (!isLoggedIn) {
    return (
      <div className={"spotify-settings " + settingsClassName}>
        <button className={"connect-spotify " + settingsClassName} onClick={login}>
          <span>Connect Spotify</span>
        </button>
      </div>
    );
  }

  else {
    return (
      <div className={"spotify-settings " + settingsClassName}>
        <button className={"create-playlist grow " + settingsClassName} onClick={openModal}>
          <span><span className="show-sm">Create </span>Playlist</span>
        </button>
        <button className={"logout shrink " + settingsClassName} onClick={logout}>
          <span>Log out</span>
        </button>
      </div>
    );
  }
};

SpotifySettings.propTypes = {
  spotifySettingsToggled: PropTypes.bool,
  isLoggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  spotifySettingsToggled: state.spotifySettingsToggled,
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(loginToSpotify()),
  logout: () => dispatch(logout()),
  openModal: () => dispatch(openModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotifySettings);