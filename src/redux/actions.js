import axios from 'axios';

import {
  LOAD_DATA,
  SAVE_DATA,
  ACTIVE_USER_CHANGE,
  ACTIVE_EXERCISE_CHANGE,
  ACTIVE_EXERCISE_PARAM_CHANGE,
  DATA_DIALOG_SHOW,
  DATA_DIALOG_HIDE
} from '../redux/types';

async function loadData() {
  const dataSource = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
  });

  const result = await dataSource.get(process.env.REACT_APP_GET_DATA_URL, {});

  return result.data;
}

async function saveData(data) {
  const dataSource = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
  });

  return await dataSource.post(process.env.REACT_APP_POST_DATA_URL, data);/*.then(res => {
    this.hideAddDataDialog();
    this.loadData();
  }).catch((err) => {
    console.error(err);
    this.hideAddDataDialog();
  });*/
}

export const loadDataAction = () => ({
  type: LOAD_DATA,
  payload: loadData()
});

export const saveDataAction = (data) => ({
  type: SAVE_DATA,
  payload: saveData(data)
});

export const changeActiveUserAction = (users) => ({
  type: ACTIVE_USER_CHANGE,
  users
});

export const changeActiveExerciseAction = (payload) => ({
  type: ACTIVE_EXERCISE_CHANGE,
  payload
});

export const changeActiveExerciseParamAction = (exerciseParam) => ({
  type: ACTIVE_EXERCISE_PARAM_CHANGE,
  exerciseParam
});

export const dataDialogShowAction = () => ({
  type: DATA_DIALOG_SHOW
});

export const dataDialogHideAction = () => ({
  type: DATA_DIALOG_HIDE
});
