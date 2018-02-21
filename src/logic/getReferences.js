import REFERENCES from "../data/references.json";

export default function getReferences(state) {

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
