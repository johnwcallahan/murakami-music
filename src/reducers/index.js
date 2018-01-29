import { combineReducers } from "redux";

import {
  toggleBook,
  toggleComposer,
  toggleGenre,
} from "./collectionItems";
import getReferences from "./getReferences";
import setFilter from "./composerFilter";

export default combineReducers({
  books: toggleBook,
  composers: toggleComposer,
  genres: toggleGenre,
  references: getReferences,
  composerFilter: setFilter
});

