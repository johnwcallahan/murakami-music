import {
  SET_SPOTIFY_USER_ID,
  TOGGLE_SPOTIFY_SETTINGS,
  OPEN_SPOTIFY_SETTINGS,
  CLOSE_SPOTIFY_SETTINGS,
  FETCH_TRACK_INFO_SUCCESS,
  FETCH_TRACK_INFO_FAILURE,
  CURRENTLY_PLAYING_TRACK,
  CURRENTLY_PLAYING_PLAYLIST,
  PLAYLIST_CREATION_FAILURE,
  PLAYLIST_CREATION_SUCCESS,
  RE_LOGIN_PROMPT,
} from "../constants/ActionTypes";
import INITIAL_STATE from "../data";

export function setSpotifyUserId(state=INITIAL_STATE.spotifyUserId, action) {
  switch (action.type) {
    case SET_SPOTIFY_USER_ID:
      return action.spotifyUserId;
    default:
      return state;
  }
}

export function toggleSpotifySettings(state=INITIAL_STATE.spotifySettingsToggled, action) {
  switch (action.type) {

    case TOGGLE_SPOTIFY_SETTINGS:
      return !state;

    case OPEN_SPOTIFY_SETTINGS:
      return true;

    case CLOSE_SPOTIFY_SETTINGS:
      return false;

    default:
      return state;
  }
}

export function playlist(state=INITIAL_STATE.playlist, action) {
  switch (action.type) {

    case FETCH_TRACK_INFO_SUCCESS:
      return {
        trackInfo: action.trackInfo,
        error: null
      };

    case FETCH_TRACK_INFO_FAILURE:
      return {
        trackInfo: [],
        error: {
          "text": "Couldn't get track info... check your internet connection"
        }
      };

    case RE_LOGIN_PROMPT:
      return {
        trackInfo: state.trackInfo,
        error: {
          "text": "Re-login to create playlist"
        }
      };

    case PLAYLIST_CREATION_SUCCESS:
      return {
        trackInfo: state.trackInfo,
        error: null
      };

    case PLAYLIST_CREATION_FAILURE:
      return {
        trackInfo: state.trackInfo,
        error: {
          "text": "Couldn't create playlist... check your internet connection"
        }
      };

    default:
      return state;
  }
}

export function setCurrentlyPlaying(state=INITIAL_STATE.currentlyPlaying, action) {
  switch (action.type) {

    case CURRENTLY_PLAYING_TRACK:
      return { "track": action.uri };

    case CURRENTLY_PLAYING_PLAYLIST:
      return { "playlist": action.uri };

    default:
      return state;
  }
}
