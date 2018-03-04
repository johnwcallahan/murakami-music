import * as types from "../constants/ActionTypes";
import axios from "axios";
import { login, logout } from "redux-implicit-oauth2";
import { show, hide } from "redux-modal";

import getAllSpotifyIds from "../logic/getAllSpotifyIds";
import { splitArrayIntoChunks } from "../util/helpers";
import config from "../constants/oauthConfig";

// =============================================================================
// Action creators
// =============================================================================
// TODO: toggleBook, toggleComposer, toggleGenre should be just one function
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

// Spotify Settings (slider)
export function toggleSpotifySettings() {
  return {
    type: types.TOGGLE_SPOTIFY_SETTINGS
  };
}

export function openSpotifySettings() {
  return {
    type: types.OPEN_SPOTIFY_SETTINGS
  };
}

export function closeSpotifySettings() {
  return {
    type: types.CLOSE_SPOTIFY_SETTINGS
  };
}

// Track info/playlists
export function requestTrackInfo(tracks) {
  return {
    type: types.REQUEST_TRACK_INFO,
    tracks
  };
}

export function fetchTrackInfoSuccess(trackInfo) {
  return {
    type: types.FETCH_TRACK_INFO_SUCCESS,
    trackInfo
  };
}

export function fetchTrackInfoFailure() {
  return {
    type: types.FETCH_TRACK_INFO_FAILURE,
  };
}

export function setSpotifyUserId(spotifyUserId) {
  return {
    type: types.SET_SPOTIFY_USER_ID,
    spotifyUserId
  };
}

export function reLoginPrompt() {
  return {
    type: types.RE_LOGIN_PROMPT
  };
}

export function playlistCreationSuccess() {
  return {
    type: types.PLAYLIST_CREATION_SUCCESS
  };
}

export function playlistCreationError() {
  return {
    type: types.PLAYLIST_CREATION_FAILURE
  };
}

export function setCurrentlyPlayingTrack(uri) {
  return {
    type: types.CURRENTLY_PLAYING_TRACK,
    uri
  };
}

export function setCurrentlyPlayingPlaylist(uri) {
  return {
    type: types.CURRENTLY_PLAYING_PLAYLIST,
    uri
  };
}

// =============================================================================
// Thunks & async actions
// =============================================================================

// Perform authentication using oAuth implicit grant flow
export function loginToSpotify() {
  return function(dispatch) {
    dispatch(login(config))
    .then(
      () => dispatch(fetchSpotifyUserInfo()),
      error => console.log(error)
    );
  };
}

// Fetch user info from Spotify API (we need the userId to create playlists)
export function fetchSpotifyUserInfo() {
  return function(dispatch, getState) {

    let token = getState().auth.token;

    axios.get("https://api.spotify.com/v1/me", {
      "headers": {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(
      response => dispatch(setSpotifyUserId(response.data.id)),
      error => alert("Oops, something went wrong!")
    );
  };
}

// Fetch track info from Spotify API
export function fetchTrackInfo() {
  return function(dispatch, getState) {
    
    let token = getState().auth.token;

    // The Spotify trackInfo API limits 50 tracks per request, so we split
    // tracks into chunks and make multiple requests if necessary 
    let state = getState();
    let allTracks = getAllSpotifyIds(state);
    let trackChunks = splitArrayIntoChunks(allTracks, 50);    
    
    let promises = [];
    trackChunks.forEach(chunk => {
      promises.push(spotifyTrackInfoRequest(chunk.join(","), token));
    });

    Promise.all(promises)
    .then(
      response => {
        let tracks = combineResponseObject(response);
        let trackInfo = buildTrackInfo(tracks);

        dispatch(fetchTrackInfoSuccess(trackInfo));
      },
      error => dispatch(fetchTrackInfoFailure(error))
    );
  };
}

function spotifyTrackInfoRequest(tracks, token) {
  return axios.get("https://api.spotify.com/v1/tracks", {
    "headers": {
      "Authorization": `Bearer ${token}`
    },
    "params": {
      "ids": tracks
    }
  });
}

export function openModal() {
  return function(dispatch) {

    dispatch(fetchTrackInfo());

    // Slight delay to give the trackInfo API a chance to complete --
    // this smooths out the animation.
    setTimeout(() => {
      dispatch(show("playlist-modal"));
    }, 300);
  };
}

export function createPlaylist(name) {
  return function(dispatch, getState) {

    let tokenExpiration = getState().auth.expiresAt;
    if (tokenExpiration < new Date().getTime()) {
      dispatch(logout());
      return dispatch(reLoginPrompt());
    }
    
    let spotifyUserId = getState().spotifyUserId;
    let token = getState().auth.token;

    axios.post(`https://api.spotify.com/v1/users/${spotifyUserId}/playlists`, {
      "name": name,
      "public": false
    }, {
      "headers": {
        "Authorization": `Bearer ${token}`
      },
    })
    .then(
      response => dispatch(addTracksToPlaylist(response.data.id)),
      error => dispatch(playlistCreationError())
    );
  };
}

export function addTracksToPlaylist(playlistId) {
  return function(dispatch, getState) {
    
    let spotifyUserId = getState().spotifyUserId;
    let token = getState().auth.token;

    let trackUris = getState().playlist.trackInfo.map(track => track.uri);

    axios.post(`https://api.spotify.com/v1/users/${spotifyUserId}/playlists/${playlistId}/tracks`, {
      "uris": trackUris,
    }, {
      "headers": {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })
    .then(
      () => {
        dispatch(hide("playlist-modal"));

        // Slight delay to smooth animation
        setTimeout(() => {
          dispatch(toggleSpotifySettings());
        }, 300);

        dispatch(playlistCreationSuccess());
        dispatch(setCurrentlyPlayingPlaylist(playlistId));
      },
      error => dispatch(playlistCreationError())
    );    
  };
}

function buildTrackInfo(tracks) {
  return tracks.map(track => {
    return {
      "name": track.name,
      "duration_ms": track.duration_ms,
      "artists": track.artists,
      "id": track.id,
      "uri": track.uri
    };
  });
}

function combineResponseObject(response) {
  return [].concat.apply([], response.map(el => el.data.tracks));
}