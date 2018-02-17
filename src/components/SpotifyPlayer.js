import React from "react";
import PropTypes from "prop-types";

const SpotifyPlayer = ({currentTrack, spotifySettingsToggled, currentPlaylist, onSettingsClick}) => {
  
  let settingsClassName = spotifySettingsToggled
    ? "opened"
    : "";

  return (
    <div className="spotify-container">
      <button className="toggle-settings" onClick={() => onSettingsClick()}>
        <i className="fas fa-cog"></i>
      </button> 
      <div className={"spotify-settings " + settingsClassName}>
        <button className={"connect-spotify " + settingsClassName}>
          <span>Connect Spotify</span>
        </button>
      </div>
      <div className="spotify-player-placeholder">
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>   
      <iframe className="spotify-player" src={"https://open.spotify.com/embed?uri=spotify:track:" + currentTrack + "&theme=white"}
        frameBorder="0"></iframe>
    </div>
  );
};

SpotifyPlayer.propTypes = {
  currentTrack: PropTypes.string,
  currentPlaylist: PropTypes.string,
  spotifySettingsToggled: PropTypes.bool,
  onSettingsClick: PropTypes.func
};

export default SpotifyPlayer;
