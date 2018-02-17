import { combineReducers } from "redux";

import {
  toggleBook,
  toggleComposer,
  toggleGenre,
} from "./collectionItems";
import setFilter from "./composerFilter";
import { setTrack, setPlaylist } from "./spotifyPlayer";

export default combineReducers({
  books: toggleBook,
  composers: toggleComposer,
  genres: toggleGenre,
  composerFilter: setFilter,
  currentTrack: setTrack,
  currentPlayist: setPlaylist
});

