import { connect } from "react-redux";
import { login, logout } from "redux-implicit-oauth2";

import { openModal, loginToSpotify } from "../actions";

import SpotifySettings from "../components/SpotifySettings";
import config from "../constants/oauthConfig";

const mapStateToProps = state => ({
  spotifySettingsToggled: state.spotifySettingsToggled,
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(loginToSpotify()),
  logout: () => dispatch(logout()),
  createPlaylist: () => dispatch(openModal())
});

const SpotifySettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotifySettings);

export default SpotifySettingsContainer;