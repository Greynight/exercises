import {
  LOAD_DATA,
  SAVE_DATA,
  ACTIVE_USER_CHANGE,
  ACTIVE_EXERCISE_CHANGE,
  ACTIVE_EXERCISE_PARAM_CHANGE,
  DATA_DIALOG_SHOW,
  DATA_DIALOG_HIDE
} from './types';

import Config from '../config/Config';

const config = new Config();

const initState = {
  data: [],
  users: config.getUsers(),
  exercises: config.getExercises(),
  params: config.getParams(),
  activeExerciseId: config.getDefaultExerciseId(),
  activeParamId: config.getDefaultParamId(),
  activeParams: config.getDefaultParams(),
  isDataDialogShown: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOAD_DATA:
      return {...state, data: action.payload};

    case SAVE_DATA:
      return state;

    case ACTIVE_USER_CHANGE:
      return {...state, users: action.users};

    case ACTIVE_EXERCISE_CHANGE:
      return {
        ...state,
        ...action.payload
      };

    case ACTIVE_EXERCISE_PARAM_CHANGE:
      return {...state, activeParamId: action.exerciseParam};

    case DATA_DIALOG_SHOW:
      return {...state, isDataDialogShown: true};

    case DATA_DIALOG_HIDE:
      return {...state, isDataDialogShown: false};

    default:
      return state;
  }
}
