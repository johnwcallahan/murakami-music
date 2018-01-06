import _ from "lodash";

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
  let index = _.findIndex(params, { title });
  params[index].selected = !params[index].selected;
  return params;
};

