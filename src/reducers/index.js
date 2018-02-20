import { combineReducers } from "redux";
import { authReducer as auth } from "redux-implicit-oauth2";

import {
  toggleBook,
  toggleComposer,
  toggleGenre,
} from "./collectionItems";
import setFilter from "./composerFilter";
import { setTrack, setPlaylist, toggleSpotifySettings } from "./spotifyPlayer";

export default combineReducers({
  auth,
  books: toggleBook,
  composers: toggleComposer,
  genres: toggleGenre,
  composerFilter: setFilter,
  currentTrack: setTrack,
  currentPlayist: setPlaylist,
  spotifySettingsToggled: toggleSpotifySettings
});

