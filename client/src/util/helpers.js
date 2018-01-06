import _ from "lodash";

export const toggleSelected = (params, title) => {
  let index = _.findIndex(params, { title });
  params[index].selected = !params[index].selected;
  return params;
};