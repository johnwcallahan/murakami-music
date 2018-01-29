import {
  TOGGLE_BOOK,
  TOGGLE_COMPOSER,
  TOGGLE_GENRE
} from "../constants/ActionTypes";

import DEFAULT_STATE from "../data";



export function toggleBook(state=DEFAULT_STATE.books, action) {
  switch (action.type) {
    case TOGGLE_BOOK:
      return state.map(b => {
        if (b.book == action.book)
          b.selected = !b.selected;
        return b;
      });
    default:
      return state;
  }
}

export function toggleComposer(state=DEFAULT_STATE.composers, action) {
  switch (action.type) {
    case TOGGLE_COMPOSER:
      return state.map(c => {
        if (c.composer == action.composer)
          c.selected = !c.selected;
        return c;
      });
    default:
      return state;
  }
}

export function toggleGenre(state=DEFAULT_STATE.genres, action) {
  switch (action.type) {
    case TOGGLE_GENRE:
      return state.map(g => {
        if (g.genre == action.genre)
          g.selected = !g.selected;
        return g;
      });
    default:
      return state;
  }
}
