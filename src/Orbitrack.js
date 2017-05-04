import React from 'react';

import { Flex, Box } from 'reflexbox';
import { observer } from 'mobx-react';

import Config from './config';

import DialogAddData from './components/DataDialog';
import Chart from './components/Chart';
import TopBar from './components/TopBar';
import StatTypes from './components/StatTypes';
import Users from './components/Users';
import Exercises from './components/Exercises';

import ObservableStore from './observableStore';

const Orbitrack = observer(class Orbitrack extends React.Component {
  constructor() {
    super();

    this.store = new ObservableStore();

    this.store.setUsers(Config.users);
    this.store.setDefaultActiveUsers(Config.users);
    this.store.setExercises(Config.exercises);
    this.store.setActiveExercise(Config.exercises[0].id);
    this.store.setDefaultDataType();
  }

  onExerciseChange = (exercise) => {
    this.store.setActiveExercise(exercise);
    this.store.setDefaultDataType();
  };

  componentDidMount = () => {
    this.store.loadData();
  };

  render() {
    const exercise = this.store.getActiveExercise();

    return (
      <Flex wrap>
        <TopBar store={this.store} />
        <Box col={2}>
          <Box m={2}>
            <Exercises
              value={exercise}
              onExerciseChange={this.onExerciseChange}
              store={this.store} />
          </Box>
          <StatTypes store={this.store} />
        </Box>
        <Box col={8}>
          <Chart store={this.store} />
        </Box>
        <Box col={2} align="center">
          <Box ml={6} mr={6}>
            <Users store={this.store} />
          </Box>
        </Box>
        <DialogAddData open={this.store.onDialogAddDataOpen} store={this.store} />
      </Flex>
    );
  }
});

Orbitrack.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Orbitrack;
