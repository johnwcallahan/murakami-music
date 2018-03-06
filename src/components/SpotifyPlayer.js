import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DEFAULT_PLAYLIST_URI } from "../constants/config";
import SpotifySettings from "./SpotifySettings";
import { toggleSpotifySettings } from "../actions";

const SpotifyPlayer = ({currentlyPlaying, spotifyUserId, onSettingsClick}) => {

  let spotifyPlayerUri;

  if (currentlyPlaying.playlist == "DEFAULT_PLAYLIST")
    spotifyPlayerUri = DEFAULT_PLAYLIST_URI;

  else if (currentlyPlaying.track)
    spotifyPlayerUri = `https://open.spotify.com/embed?uri=spotify:track:${currentlyPlaying.track}&theme=white`;

  else if (currentlyPlaying.playlist)
    spotifyPlayerUri = `https://open.spotify.com/embed?uri=spotify:user:${spotifyUserId}:playlist:${currentlyPlaying.playlist}&theme=white`;

  return (
    <div className="spotify-container">
      <button className="toggle-settings" onClick={() => onSettingsClick()}>
        <i className="fas fa-cog"></i>
      </button>
      <SpotifySettings />
      <div className="spotify-player-placeholder">
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
      <iframe className="spotify-player" src={spotifyPlayerUri}
        frameBorder="0"></iframe>
    </div>
  );
};

SpotifyPlayer.propTypes = {
  currentlyPlaying: PropTypes.object,
  playlistUri: PropTypes.string,
  spotifyUserId: PropTypes.string,
  onSettingsClick: PropTypes.func,
};

const mapStateToProps = state => ({
  currentlyPlaying: state.currentlyPlaying,
  spotifyUserId: state.spotifyUserId
});

const mapDispatchToProps = dispatch => ({
  onSettingsClick: () => dispatch(toggleSpotifySettings())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotifyPlayer);

