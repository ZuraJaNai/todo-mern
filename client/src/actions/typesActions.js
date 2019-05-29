import axios from "axios";
import { SET_TYPES } from "./types";

export const initializeTypes = () => dispatch => {
  updateTypes(dispatch);
};

export const addType = typeData => dispatch => {
  axios
    .post("/api/types/", typeData)
    .then(updateTypes(dispatch))
    .catch(err => {
      console.log("errors in addType " + err);
    });
};

export const deleteType = typeData => dispatch => {
  const deleteURL = "/api/types/" + typeData._id;
  axios
    .delete(deleteURL)
    .then(updateTypes(dispatch))
    .catch(err => {
      console.log("errors in deleteType " + err);
    });
};

const updateTypes = dispatch => {
  getTypes().then(types => {
    dispatch(setTypes(types));
  });
};

export const getTypes = () => {
  return axios
    .get("/api/types")
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log("err in getTypess " + err);
    });
};

export const setTypes = types => {
  return {
    type: SET_TYPES,
    payload: types,
  };
};
