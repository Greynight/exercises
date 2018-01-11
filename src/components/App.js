import React from 'react';

import { Flex, Box } from 'reflexbox';

import DialogDataContainer from './DataDialogContainer';
import Chart from './Chart';
import TopBar from './TopBar';
import ExerciseParams from './ExerciseParams';
import Users from './Users';
import Exercises from './Exercises';
import Loader from './Loader';

const App = (props) => {
  return (
    <Flex wrap>
      {props.isLoading ? <Loader/> : ''}
      <TopBar />
      <Box w={1/6} style={{minWidth: 200}}>
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
      <Box w={3/4} style={{minWidth: 400}}>
        <Chart
          data={props.data}
          params={props.params}
          users={props.users}
          activeExerciseId={props.activeExerciseId}
          activeParamId={props.activeParamId} />
      </Box>
      <Box w={1/12} align="center" style={{minWidth: 100}}>
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
