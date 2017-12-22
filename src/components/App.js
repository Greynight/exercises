import React from 'react';

import { Flex, Box } from 'reflexbox';

import DialogDataContainer from './DataDialogContainer';
import Chart from './Chart';
import TopBar from './TopBar';
import ExerciseParams from './ExerciseParams';
import Users from './Users';
import Exercises from './Exercises';

const App = (props) => {
  return (
    <Flex wrap>
      <TopBar />
      <Box col={2}>
        <Box m={2}>
          <Exercises
            exercises={props.exercises}
            value={props.activeExerciseId}
            handleExerciseChange={props.handleExerciseChange}
          />
        </Box>
        <ExerciseParams
          params={props.params}
          activeParams={props.activeParams}
          activeParamId={props.activeParamId}
          handleParamChange={props.handleParamChange}
        />
      </Box>
      <Box col={8}>
        <Chart
          data={props.data}
          params={props.params}
          users={props.users}
          activeExerciseId={props.activeExerciseId}
          activeParamId={props.activeParamId} />
      </Box>
      <Box col={2} align="center">
        <Box ml={6} mr={6}>
          <Users
            users={props.users}
            handleUserChange={props.handleUserChange}
          />
        </Box>
      </Box>
      <DialogDataContainer />
    </Flex>
  );
};

export default App;
