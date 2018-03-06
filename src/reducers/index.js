import { combineReducers } from "redux";
import { authReducer as auth } from "redux-implicit-oauth2";
import { reducer as modal } from "redux-modal";
import {
  toggleBook,
  toggleComposer,
  toggleGenre,
} from "./collectionItems";
import setFilter from "./composerFilter";
import {
  playlist,
  toggleSpotifySettings,
  setSpotifyUserId,
  setCurrentlyPlaying,
} from "./spotifyPlayer";

export default combineReducers({
  auth,
  modal,
  books: toggleBook,
  composers: toggleComposer,
  genres: toggleGenre,
  composerFilter: setFilter,
  playlist,
  spotifySettingsToggled: toggleSpotifySettings,
  spotifyUserId: setSpotifyUserId,
  currentlyPlaying: setCurrentlyPlaying
});

