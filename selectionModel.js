const _ = require("lodash");

let books = [
  {
    "title": "Dance, Dance, Dance",
    "selected": true
  },
  {
    "title": "Sputnik Sweetheart",
    "selected": true
  },
  {
    "title": "Hear The Wind Sing",
    "selected": true
  }
]

let composers = [
  {
    "title": "The Beatles",
    "genre": "Rock",
    "selected": true
  },
  {
    "title": "Duke Ellington",
    "genre": "Jazz",
    "selected": false
  },
  {
    "title": "Debussy",
    "genre": "Classical",
    "selected": false
  }
]

let genres = {
  "Rock": {
    "selected": true
  },
  "Classical": {
    "selected": true
  },
  "Jazz": {
    "selected": true
  }
}

let composerTmpStorage = [];


function renderBooks() {
  return books.filter(book => {
    return book.selected;
  }).map(book => {
    return book.title;
  }).sort(); // alphabetize
}

function renderComposers() {
  let filteredComposers = composers.filter(composer => {

    // Save to tmp storage if user is de-selecting a genre that includes a composer
    // that is already selected
    let genre = genres.filter(genre => genre.title == composer.genre)[0];
    if (composer.selected && !genres[composer.genre].selected) {
      composerTmpStorage.push(composer);
    }

    return genres[composer.genre].selected
  });

  // Return combined filtered composers with tmp storage if the genre is selected
  return filteredComposers.concat(composerTmpStorage.filter(composer => {
    return genres[composer.genre].selected
      && filteredComposers.map(c => c.title).indexOf(composer.title) == -1;       // do not add duplicates
  })).map(composer => {
    return composer.title;
  }).sort(); // alphabetize
}

console.log(renderBooks());
console.log(renderComposers())
