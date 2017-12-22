import React from 'react';



import store from './../store';

import { Box } from 'reflexbox';

const styles = {
  customWidth: {
    width: 164,
  }
};

import DataDialog from './DataDialog';

import { connect } from 'react-redux';

import {
  saveDataAction,
  dataDialogHideAction
} from './../redux/actions';

const mapStateToProps = (state) => ({
  exercises: state.exercises,
  isOpen: state.isDataDialogShown,
  users: state.users
});

const mapDispatchToProps = (dispatch) => ({
  handleDataDialogHide: () => {
    dispatch(dataDialogHideAction());
  },
  handleDataSave: (data) => {
    debugger
    dispatch(saveDataAction(data));
  }
});

const DialogDataContainer = connect(mapStateToProps, mapDispatchToProps)(DataDialog);

export default DialogDataContainer;
