import { connect } from "react-redux";
import { login, logout } from "redux-implicit-oauth2";
import { createPlaylist } from "../actions";

import getReferences from "../logic/getReferences";

import SpotifySettings from "../components/SpotifySettings";
import config from "../constants/oauthConfig";

function getAllSpotifyIds(state) {
  let references = getReferences(state);
  let allSpotifyIds = [];
  references.forEach(ref => {
    ref.spotifyId.forEach(id => {
      allSpotifyIds.push(id);
    });
  });
  return allSpotifyIds;
}

const mapStateToProps = state => ({
  spotifySettingsToggled: state.spotifySettingsToggled,
  isLoggedIn: state.auth.isLoggedIn,
  allSpotifyIds: getAllSpotifyIds(state)  
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(login(config)),
  logout: () => dispatch(logout()),
  createPlaylist: () => dispatch(createPlaylist())
});

const SpotifySettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotifySettings);

export default SpotifySettingsContainer;