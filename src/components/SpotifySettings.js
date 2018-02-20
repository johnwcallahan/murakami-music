import React from "react";
import PropTypes from "prop-types";

const SpotifySettings = ({spotifySettingsToggled, isLoggedIn, login, logout, createPlaylist}) => {

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
        <button className={"create-playlist " + settingsClassName} onClick={createPlaylist}>
          <span>Create Playlist</span>
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
  createPlaylist: PropTypes.func.isRequired
};

export default SpotifySettings;
