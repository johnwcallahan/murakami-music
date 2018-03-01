import * as types from "../constants/ActionTypes";
import getAllSpotifyIds from "../logic/getAllSpotifyIds";
import { show, hide } from "redux-modal";
import axios from "axios";
import { splitArrayIntoChunks } from "../util/helpers";
import { login } from "redux-implicit-oauth2";
import config from "../constants/oauthConfig";

// =============================================================================
// Action creators
// =============================================================================
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

export function toggleSpotifySettings() {
  return {
    type: types.TOGGLE_SPOTIFY_SETTINGS
  };
}

export function requestTrackInfo(tracks) {
  return {
    type: types.REQUEST_TRACK_INFO,
    tracks
  };
}

export function setPlaylist(playlist) {
  return {
    type: types.SET_PLAYLIST,
    playlist: playlist
  };
}

export function setSpotifyUserId(spotifyUserId) {
  return {
    type: types.SET_SPOTIFY_USER_ID,
    spotifyUserId
  };
}

export function setTrack(uri) {
  return {
    type: types.SET_TRACK,
    uri
  };
}

export function setCurrentPlaylistUri(uri) {
  return {
    type: types.SET_CURRENT_PLAYLIST_URI,
    uri
  };
}

// =============================================================================
// Thunks & async actions
// =============================================================================
export function loginToSpotify() {
  return function(dispatch) {
    dispatch(login(config))
      .then(
        () => dispatch(getSpotifyUserInfo()),
        error => console.log(error)
      );
  };
}

export function getSpotifyUserInfo() {
  return function(dispatch, getState) {
    axios.get("https://api.spotify.com/v1/me", {
      "headers": {
        "Authorization": `Bearer ${getState().auth.token}`
      }
    })
      .then(
        response => dispatch(setSpotifyUserId(response.data.id)),
        () => alert("Oops, something went wrong!")
      );
  };
}

export function getTrackInfo() {
  return function(dispatch, getState) {
    dispatch(requestTrackInfo);
    
    let token = getState().auth.token;

    // The Spotify trackInfo API limits 50 tracks per request, so we split
    // tracks into chunks and make multiple requests if necessary 
    let allTracks = getAllSpotifyIds(getState());
    let trackChunks = splitArrayIntoChunks(allTracks, 50);    
    
    let promises = [];
    trackChunks.forEach(chunk => {
      promises.push(spotifyTrackInfoRequest(chunk.join(","), token));
    });

    Promise.all(promises)
      .then(
        // TODO: Make this clearer
        response => [].concat.apply([], response.map(el => el.data.tracks)),
        //////////////////////////
        error => console.log(error)
      )
      .then(data => 
        dispatch(setPlaylist(data))
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
    dispatch(setPlaylist([]));
    dispatch(getTrackInfo());
    dispatch(show("playlist-modal"));
  };
}

export function createPlaylist(name) {
  return function(dispatch, getState) {
    
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
        () => alert("Oops, something went wrong!")
      );
  };
}

export function addTracksToPlaylist(playlistId) {
  return function(dispatch, getState) {
    
    let spotifyUserId = getState().spotifyUserId;
    let token = getState().auth.token;

    let trackUris = getState().currentPlaylist.map(track => track.uri);

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
          setTimeout(() => {
            dispatch(toggleSpotifySettings());
          }, 300);
          dispatch(setCurrentPlaylistUri(playlistId));
        },
        () => alert("Oops, something went wrong!")
      );    
  };
}