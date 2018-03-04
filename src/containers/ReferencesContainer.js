import { connect } from "react-redux";
import { setCurrentlyPlayingTrack, closeSpotifySettings } from "../actions";

import getReferences from "../logic/getReferences";
import References from "../components/References";

const mapStateToProps = state => ({
  references: getReferences(state)
});

const mapDispatchToProps = dispatch => ({
  onClick: uri => {
    dispatch(setCurrentlyPlayingTrack(uri));

    // Slight delay to smooth animation
    setTimeout(() => {
      dispatch(closeSpotifySettings());
    }, 400);
  }
});

const ReferencesContainer = connect(
  mapStateToProps,
  mapDispatchToProps

)(References);

export default ReferencesContainer;