import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";

const SpotifyPlayer = ({spotifyIds}) => {
  
  return (
    <div className="spotify-container">
      <button className="create-playlist"><i className="fas fa-cog"></i></button>    
      <iframe className="spotify-player" src="https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DX9uKNf5jGX6m&theme=white"
        frameBorder="0"></iframe>
    </div>
  );
};

SpotifyPlayer.propTypes = {
  spotifyIds: PropTypes.array
};

export default SpotifyPlayer;
