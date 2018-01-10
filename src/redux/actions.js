import {
  LOAD_DATA,
  SAVE_DATA,
  ACTIVE_USER_CHANGE,
  ACTIVE_EXERCISE_CHANGE,
  ACTIVE_EXERCISE_PARAM_CHANGE,
  DATA_DIALOG_SHOW,
  DATA_DIALOG_HIDE,
  SHOW_LOADER
} from '../redux/types';

import Config from './../config/Config';

export const loadDataAction = () => ({
  type: LOAD_DATA,
  payload: Config.loadData()
});

export const saveDataAction = (data) => ({
  type: SAVE_DATA,
  payload: Config.saveData(data)
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

export const showLoader = () => ({
  type: SHOW_LOADER
});
