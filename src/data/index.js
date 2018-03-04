import books from "../data/books.json";
import composersGenres from "../data/composersGenres.json";
import genres from "../data/genres.json";

var state = {
  books: {},
  composers: {},
  genres: {},
  composerFilter: "",
  currentlyPlaying: {
    "playlist": "DEFAULT_PLAYLIST"
  },
  playlist: {
    "trackInfo": [],
    "error": null
  },
  spotifyUserId: "",
  currentPlaylistUri: "",
  spotifySettingsToggled: false
};

books.forEach(book => {
  state.books[book] = {
    "book": book,
    "selected": false
  };
});

for (let composer in composersGenres) {
  state.composers[composer] = {
    "composer": composer,
    "genre": composersGenres[composer],
    "selected": false
  };
}

genres.forEach(genre => {
  state.genres[genre] = {
    "genre": genre,
    "selected": true
  };
});

export default state;