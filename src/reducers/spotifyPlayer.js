import { SET_TRACK, SET_PLAYLIST, TOGGLE_SPOTIFY_SETTINGS } from "../constants/ActionTypes";
import DEFAULT_STATE from "../data";

export function setTrack(state=DEFAULT_STATE.currentTrack, action) {
  switch (action.type) {
    case SET_TRACK:
      return action.track;
    default:
      return state;
  }
}

export function setPlaylist(state=DEFAULT_STATE.currentPlaylist, action) {
  switch (action.type) {
    case SET_PLAYLIST:
      return action.playlist;
    default:
      return state;
  }
}

export function toggleSpotifySettings(state=DEFAULT_STATE.spotifySettingsToggled, action) {
  switch (action.type) {
    case TOGGLE_SPOTIFY_SETTINGS:
      return !state;
    default:
      return state;
  }
}