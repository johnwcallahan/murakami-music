import REFERENCES from "../data/references.json";

import find from "lodash/find";

export default function getReferences(state) {
  if (theStateIsInvalid(state))
    return REFERENCES;

  if (thereAreNoBooksSelected(state) && thereAreNoComposersSelected(state))
    return REFERENCES;

  if (thereAreNoBooksSelected(state))
    return REFERENCES.filter(r => isPropertyOfTypeSelected(state, r.composer, "composer"));

  if (thereAreNoComposersSelected(state)) {
    return REFERENCES.filter(r => isPropertyOfTypeSelected(state, r.book, "book"));
  }

  return REFERENCES.filter(r => {
    return isPropertyOfTypeSelected(state, r.composer, "composer")
        && isPropertyOfTypeSelected(state, r.book, "book");
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
