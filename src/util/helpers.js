import { findIndex } from "lodash/findIndex";

export function splitArrayIntoChunks(arr, chunkSize) {
  if (chunkSize == 0) {
    throw new Error("Chunk size must be greater than 0");
  }
  let output = [];
  for (let i=0, j=arr.length; i<j; i+=chunkSize) {
    output.push(arr.slice(i, i+chunkSize));
  }
  return output;
}

export const findParamInState = (params, title) => {
  return params.filter(param => param.title == title)[0];
};

export const updateComposersWithinGenre = (composers, genre) => {
  let updatedComposers = composers.map(composer => {
    if (composer.genre == genre.title) {
      composer.genreSelected = genre.selected;
    }
    if (composer.selected) composer.selected = false;
    return composer;
  });
  return updatedComposers;
};

export const toggleSelected = (params, title) => {
  let index = findIndex(params, { title });
  params[index].selected = !params[index].selected;
  return params;
};

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

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch(err) {
    console.log(err);
  }
};
