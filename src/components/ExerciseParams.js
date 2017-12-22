import React from 'react';

import { List, ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import { yellow500 } from 'material-ui/styles/colors';

const ExerciseParams = ({ params, activeParams, activeParamId, handleParamChange }) => {
  const getIconColor = (paramId, activeParamId) => {
    return paramId === activeParamId ? yellow500 : '';
  };

  return (
    <List>
      {params
        .filter(param => activeParams.includes(param.id))
        .map(exerciseParam => <ListItem
          id={exerciseParam.id}
          key={exerciseParam.id}
          primaryText={exerciseParam.name}
          onClick={handleParamChange}
          leftIcon={<ActionGrade color={getIconColor(exerciseParam.id, activeParamId)} />}
        />)}
    </List>
  );
};

export default ExerciseParams;
