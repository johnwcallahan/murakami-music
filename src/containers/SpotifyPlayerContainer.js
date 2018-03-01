import { connect } from "react-redux";
import { toggleSpotifySettings } from "../actions";

import SpotifyPlayer from "../components/SpotifyPlayer";


const mapStateToProps = state => ({
  currentlyPlaying: state.currentlyPlaying,
  spotifyUserId: state.spotifyUserId
});

const mapDispatchToProps = dispatch => ({
  onSettingsClick: () => dispatch(toggleSpotifySettings())
});

const SpotifyPlayerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotifyPlayer);

export default SpotifyPlayerContainer;