import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const Exercises = ({ exercises, value, handleExerciseChange }) => {
  return (
    <SelectField
      fullWidth={true}
      floatingLabelText="Exercises"
      value={value}
      onChange={handleExerciseChange}
    >
      {exercises.map(exercise => <MenuItem
        key={exercise.id}
        value={exercise.id}
        primaryText={exercise.name} />)}
    </SelectField>
  );
};

export default Exercises;
