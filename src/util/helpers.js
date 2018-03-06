import REFERENCES from "../data/references.json";

// Return references based on selected params in state
export function getReferences(state) {

  if (theStateIsInvalid(state))
    return REFERENCES;

  let noBooksSelected = thereAreNoBooksSelected(state);
  let noComposersSelected = thereAreNoComposersSelected(state);

  return REFERENCES.filter(r => {
    return (noBooksSelected || isPropertyOfTypeSelected(state, r.book, "book"))
        && (noComposersSelected || isPropertyOfTypeSelected(state, r.composer, "composer"))
        && isPropertyOfTypeSelected(state, r.genre, "genre");
  });
}

function theStateIsInvalid(state) {
  return !state || !state.books || !state.composers || !state.genres;
}

function thereAreNoBooksSelected(state) {
  for (let book in state.books) {
    if (state.books[book].selected)
      return false;
  }
  return true;
}

function thereAreNoComposersSelected(state) {
  for (let composer in state.composers) {
    if (state.composers[composer].selected)
      return false;
  }
  return true;
}

function isPropertyOfTypeSelected(state, property, type) {
  return state[type + "s"][property].selected;
}

// Load Redux store from local storage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState == null)
      return undefined;
    return JSON.parse(serializedState);
  } catch(err) {
    return undefined;
  }
};

// Save Redux store to local storage
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch(err) {
    console.log(err);
  }
};

// Return Spotify IDs based on selected params in state
export function getAllSpotifyIds(state) {
  let references = getReferences(state);
  let allSpotifyIds = [];
  references.forEach(ref => {
    ref.spotifyId.forEach(id => {
      allSpotifyIds.push(id);
    });
  });
  return allSpotifyIds;
}

export function buildTrackInfo(tracks) {
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

// Get all artists from Spotify API response object
export function getArtists(track) {
  return track.artists.map(track => {
    return track.name;
  }).join(", ");
}

// Get duration of track in minutes and seconds
export function getDurationInMinutesAndSeconds(track) {
  let duration_ms = track["duration_ms"];
  return msToMinutesAndSeconds(duration_ms);
}

// Convert milliseconds to minutes and seconds, e.g. 324342 --> "5:24"
function msToMinutesAndSeconds(ms) {
  let minutes = Math.floor(ms/60000);
  let seconds = ((ms%60000)/1000).toFixed(0);
  return (seconds == 60
    ? (minutes+1) + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}

export function combineResponseObject(response) {
  return [].concat.apply([], response.map(el => el.data.tracks));
}