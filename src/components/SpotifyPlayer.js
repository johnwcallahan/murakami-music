import React from "react";
import PropTypes from "prop-types";

export default class SpotifyPlayer extends React.Component {
  render() {

    let allSpotifyIDs = this.props.tracks.join(",");

    return (
      <div className="spotify-player-container">
        <iframe src={"https://embed.spotify.com/?theme=white&uri=spotify:trackset:Playlist:" + allSpotifyIDs}
                width="300"
                height="80"
                frameBorder="0"
                allowTransparency="true"
                className="player">
        </iframe>
      </div>
    );
  }
}

SpotifyPlayer.propTypes = {
  tracks: PropTypes.array
};
