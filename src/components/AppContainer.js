import App from './App';

import { connect } from 'react-redux';
import store from '../store';

import {
  changeActiveUserAction,
  changeActiveExerciseAction,
  changeActiveExerciseParamAction
} from './../redux/actions';

const mapStateToProps = (state) => ({
  activeExerciseId: state.activeExerciseId,
  activeParamId: state.activeParamId,
  activeParams: state.activeParams,
  data: state.data,
  exercises: state.exercises,
  params: state.params,
  isDataDialogShown: state.isDataDialogShown,
  users: state.users
});

const mapDispatchToProps = (dispatch) => ({
  handleUserChange: (event, isInputChecked) => {
    const users = store.getState().users;
    const userId = event.currentTarget.id;
    users.forEach(user => user.isActive = user.id === userId ? isInputChecked : user.isActive);

    dispatch(changeActiveUserAction(users));
  },
  handleExerciseChange: (event, index, activeExerciseId) => {
    const exercises = store.getState().exercises;
    const activeParams = exercises.find(item => item.id === activeExerciseId).params;
    const activeParamId = activeParams[0];

    const payload = {
      activeExerciseId,
      activeParams,
      activeParamId
    };

    dispatch(changeActiveExerciseAction(payload));
  },
  handleParamChange: (event) => {
    dispatch(changeActiveExerciseParamAction(event.currentTarget.id));
  }
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
