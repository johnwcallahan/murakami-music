import { 
  SET_TRACK, 
  SET_PLAYLIST, 
  TOGGLE_SPOTIFY_SETTINGS,
  SET_SPOTIFY_USER_ID,
  SET_CURRENT_PLAYLIST_URI
} from "../constants/ActionTypes";

import DEFAULT_STATE from "../data";


export function setCurrentlyPlaying(state=DEFAULT_STATE.currentlyPlaying, action) {
  switch (action.type) {
    case SET_TRACK:
      return { "track": action.uri };
    case SET_CURRENT_PLAYLIST_URI:
      return { "playlist": action.uri };
    default:
      return state;
  }
}

export function setSpotifyUserId(state=DEFAULT_STATE.spotifyUserId, action) {
  switch (action.type) {
    case SET_SPOTIFY_USER_ID:
      return action.spotifyUserId;
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