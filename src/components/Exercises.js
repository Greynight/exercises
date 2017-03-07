import React from 'react';
import { observer } from 'mobx-react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  usersSelect: {
    padding: 16
  }
};

const Exercises = observer(class Exercises extends React.Component {
  constructor(props) {
    super(props);

    this.store = props.store;
    this.exercises = this.store.getExercises();
  }

  onExerciseChange = (event, index, value) => {
    this.store.setActiveExercise(value);
    this.store.setDefaultDataType();
  };

  render() {
    return (
      <div style={styles.usersSelect}>
        <SelectField
          floatingLabelText="Exercises"
          value={this.store.getActiveExercise()}
          onChange={this.onExerciseChange}
        >
          {this.exercises.map(exercise => <MenuItem
            key={exercise.id}
            value={exercise.id}
            primaryText={exercise.name} />)}
        </SelectField>
      </div>
    );
  }
});

export default Exercises;
