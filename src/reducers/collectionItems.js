import {
  TOGGLE_BOOK,
  TOGGLE_COMPOSER,
  TOGGLE_GENRE
} from "../constants/ActionTypes";
import INITIAL_STATE from "../data";

export function toggleBook(state=INITIAL_STATE.books, action) {
  switch (action.type) {
    case TOGGLE_BOOK:
      return toggleParameter("book", state, action);
    default:
      return state;
  }
}

export function toggleComposer(state=INITIAL_STATE.composers, action) {
  switch (action.type) {
    case TOGGLE_COMPOSER:
      return toggleParameter("composer", state, action);
    default:
      return state;
  }
}

export function toggleGenre(state=INITIAL_STATE.genres, action) {
  switch (action.type) {
    case TOGGLE_GENRE:
      return toggleParameter("genre", state, action);
    default:
      return state;
  }
}

function toggleParameter(type, state, action) {
  let stateCopy = Object.assign({}, state);
  for (let param in stateCopy) {
    if (stateCopy[param][type] == action[type]) {
      stateCopy[param].selected = !state[param].selected;
    }
  }
  return stateCopy;
}