import {
  TOGGLE_BOOK,
  TOGGLE_COMPOSER,
  TOGGLE_GENRE
} from "../constants/ActionTypes";

import DEFAULT_STATE from "../data";

// TODO: These should all be just one function

export function toggleBook(state=DEFAULT_STATE.books, action) {
  switch (action.type) {
    case TOGGLE_BOOK:
      var stateCopy = Object.assign({}, state);
      for (let b in stateCopy) {
        if (stateCopy[b].book == action.book) {
          stateCopy[b].selected = !state[b].selected;
        }
      }
      return stateCopy;
    default:
      return state;
  }
}

export function toggleComposer(state=DEFAULT_STATE.composers, action) {
  switch (action.type) {
    case TOGGLE_COMPOSER:
      var stateCopy = Object.assign({}, state);
      for (let c in stateCopy) {
        if (stateCopy[c].composer == action.composer) {
          stateCopy[c].selected = !state[c].selected;
        }
      }
      return stateCopy;  
    default:
      return state;
  }
}

export function toggleGenre(state=DEFAULT_STATE.genres, action) {
  switch (action.type) {
    case TOGGLE_GENRE:
      var stateCopy = Object.assign({}, state);
      for (let g in stateCopy) {
        if (stateCopy[g].genre == action.genre) {
          stateCopy[g].selected = !state[g].selected;
        }
      }
      return stateCopy;     
    default:
      return state;
  }
}
