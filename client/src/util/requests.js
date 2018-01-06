import axios from "axios";

export const fetchParams = (param) => {
  return axios.get("http://localhost:3000/api/" + param);
};

export const fetchRefs = (params) => {
  return axios.post("http://localhost:3000/api/refs", params);
};
