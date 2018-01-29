import books from "../data/books.json";
import composersGenres from "../data/composersGenres.json";
import genres from "../data/genres.json";
import references from "../data/references.json";

var state = {};

state.books = books.map(book => {
  return { 
    "book": book, 
    "selected": false 
  };
});

let composers = [];
for (let composer in composersGenres) {
  composers.push({
    "composer": composer,
    "genre": composersGenres[composer],
    "selected": false
  });
}
state.composers = composers;

state.genres = genres.map(genre => {
  return {
    "genre": genre,
    "selected": true
  };
});

state.references = references;
state.composerFilter = "";

export default state;
