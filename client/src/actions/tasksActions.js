import axios from "axios";
import { SET_TASKS } from "./types";

export const initializeTasks = () => dispatch => {
  return updateTasks(dispatch);
};

export const addTask = taskData => dispatch => {
  axios
    .post("/api/tasks", taskData)
    .then(updateTasks(dispatch))
    .catch(err => {
      console.log("errors in addTask " + err);
    });
};

export const deleteTask = taskData => dispatch => {
  const deleteURL = "/api/tasks/" + taskData._id;
  axios
    .delete(deleteURL)
    .then(updateTasks(dispatch))
    .catch(err => {
      console.log("errors in deleteTask " + err);
    });
};

export const updateTask = taskData => dispatch => {
  const updateURL = "/api/tasks/" + taskData._id;
  axios
    .put(updateURL, taskData)
    .then(updateTasks(dispatch))
    .catch(err => {
      console.log("errors in updateTask " + err);
    });
};

export const updateTasks = dispatch => {
  return getTasks().then(tasks => {
    dispatch(setTasks(tasks));
  });
};

const getTasks = () => {
  return axios
    .get("/api/tasks")
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log("err in getTasks " + err);
    });
};

const setTasks = tasks => {
  return {
    type: SET_TASKS,
    payload: tasks,
  };
};
