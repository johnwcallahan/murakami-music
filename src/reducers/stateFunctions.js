import find from "lodash/find";

export function getReferences() {
  if (thereAreNoBooksSelected() && thereAreNoComposersSelected())
    return references;

  if (thereAreNoBooksSelected())
    return references.filter(r => isPropertyOfTypeSelected(r.composer, "composer"));

  if (thereAreNoComposersSelected())
    return references.filter(r => isPropertyOfTypeSelected(r.book, "book"));

  return references.filter(r => {
    return isPropertyOfTypeSelected(r.composer, "composer")
        && isPropertyOfTypeSelected(r.book, "book")
  });
}

export function thereAreNoBooksSelected() {
  for (let i = 0; i < state.books.length; i++) {
    if (state.books[i].selected)
      return false;
  }
  return true;
}

export function thereAreNoComposersSelected() {
  for (let i = 0; i < state.composers.length; i++) {
    if (state.composers[i].selected)
      return false;
  }
  return true;
}

export function isPropertyOfTypeSelected(property, type) {
  let foundProperty = _.find(state[type + "s"], {[type]: property});
  if (foundProperty && foundProperty.selected)
    return foundProperty.selected;

  return false;
}