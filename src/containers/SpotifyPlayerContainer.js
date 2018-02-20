import { connect } from "react-redux";
import { toggleSpotifySettings } from "../actions";

import SpotifyPlayer from "../components/SpotifyPlayer";


const mapStateToProps = state => ({
  currentTrack: state.currentTrack,
  currentPlaylist: state.currentPlaylist
});

const mapDispatchToProps = dispatch => ({
  onSettingsClick: () => dispatch(toggleSpotifySettings())
});

const SpotifyPlayerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotifyPlayer);

export default SpotifyPlayerContainer;