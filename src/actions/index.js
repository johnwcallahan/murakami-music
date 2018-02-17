import * as types from "../constants/ActionTypes";

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

export function setTrack(track) {
  return {
    type: types.SET_TRACK,
    track
  };
}

export function setPlaylist(playlist) {
  return {
    type: types.SET_PLAYLIST,
    playlist
  };
}

export function setFilter(filter) {
  return {
    type: types.SET_FILTER,
    filter
  };
}

export function toggleSpotifySettings() {
  return {
    type: types.TOGGLE_SPOTIFY_SETTINGS
  };
}
