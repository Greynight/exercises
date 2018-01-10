import {
  LOAD_DATA,
  SAVE_DATA,
  ACTIVE_USER_CHANGE,
  ACTIVE_EXERCISE_CHANGE,
  ACTIVE_EXERCISE_PARAM_CHANGE,
  DATA_DIALOG_SHOW,
  DATA_DIALOG_HIDE,
  SHOW_LOADER,
  HIDE_LOADER
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
  isDataDialogShown: false,
  isLoading: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOAD_DATA:
      return {...state, data: action.payload, isLoading: false};

    case SAVE_DATA:
      const newDataItem = action.payload.data;
      const data = [...state.data];

      if (newDataItem && config.isDataItemCorrect(newDataItem)) {
        data.push(newDataItem);
      } else {
        console.error('Server response is incorrect');
      }

      return {...state, data, isLoading: false};

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

    case SHOW_LOADER:
      return {...state, isLoading: true};

    case HIDE_LOADER:
      return {...state, isLoading: false};

    default:
      return state;
  }
}
