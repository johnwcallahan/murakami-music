import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";

const SpotifyPlayer = ({currentTrack, currentPlaylist}) => {
  
  return (
    <div className="spotify-container">
      <button className="create-playlist"><i className="fas fa-cog"></i></button> 
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
  currentPlaylist: PropTypes.string
};

export default SpotifyPlayer;
