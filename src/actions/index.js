import * as types from "../constants/ActionTypes";

export function requestReferences() {
  return {
    type: types.REQUEST_REFERENCES
  };
}

export function receiveReferences(references) {
  return {
    type: types.RECEIVE_REFERENCES,
    references
  };
}

export function toggleBook(book) {
  return {
    type: types.TOGGLE_BOOK,
    book
  };
}

export function toggleComposer(composer) {
  return {
    type: types.TOGGLE_COMPOSER,
    composer
  };
}

export function toggleGenre(genre) {
  return {
    type: types.TOGGLE_GENRE,
    genre
  };
}

export function setFilter(filter) {
  return {
    type: types.SET_FILTER,
    filter
  };
}
