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
  for (let i = 0; i < state.books.length; i++) {
    if (state.books[i].selected)
      return false;
  }
  return true;
}

function thereAreNoComposersSelected(state) {
  for (let i = 0; i < state.composers.length; i++) {
    if (state.composers[i].selected)
      return false;
  }
  return true;
}

function isPropertyOfTypeSelected(state, property, type) {
  let foundProperty = find(state[type + "s"], {[type]: property});
  if (foundProperty && foundProperty.selected)
    return foundProperty.selected;

  return false;
}
