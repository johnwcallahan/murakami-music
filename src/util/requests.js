import axios from "axios";

export const fetchParams = (param) => {
  return axios.get("/api/" + param);
};

export const fetchRefs = (params) => {
  return axios.post("/api/refs", params);
};
