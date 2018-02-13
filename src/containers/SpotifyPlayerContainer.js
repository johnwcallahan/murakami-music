import { connect } from "react-redux";

import getReferences from "../logic/getReferences";
import SpotifyPlayer from "../components/SpotifyPlayer";

const mapStateToProps = state => ({
  spotifyIds: getReferences(state).map(ref => ref.spotifyId)
});

const SpotifyPlayerContainer = connect(
  mapStateToProps
)(SpotifyPlayer);

export default SpotifyPlayerContainer;