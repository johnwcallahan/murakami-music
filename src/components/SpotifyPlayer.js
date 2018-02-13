import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";

const SpotifyPlayer = ({spotifyIds}) => {
  
  return (
    <div className="spotify-container">
      <button className="create-playlist">Create Playlist</button>
      <iframe className="spotify-player" src="https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DX9uKNf5jGX6m&theme=white"
        frameBorder="0" allowTransparency="true"></iframe>
    </div>
  );
};

SpotifyPlayer.propTypes = {
  spotifyIds: PropTypes.array
};

export default SpotifyPlayer;
