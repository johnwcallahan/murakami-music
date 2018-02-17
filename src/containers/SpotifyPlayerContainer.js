import { connect } from "react-redux";

import SpotifyPlayer from "../components/SpotifyPlayer";

const mapStateToProps = state => ({
  currentTrack: state.currentTrack,
  currentPlaylist: state.currentPlaylist
});

const SpotifyPlayerContainer = connect(
  mapStateToProps
)(SpotifyPlayer);

export default SpotifyPlayerContainer;