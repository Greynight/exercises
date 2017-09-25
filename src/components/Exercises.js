import React from 'react';
import { observer } from 'mobx-react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const Exercises = observer(class Exercises extends React.Component {
  constructor(props) {
    super(props);

    this.store = props.store;
    this.style = props.style;
    this.exercises = this.store.exercises;
    this.onExerciseChange = props.onExerciseChange;
  }

  handleExerciseChange = (event, index, value) => {
    this.onExerciseChange(value);
  };

  render() {
    const value = this.props.value;

    return (
      <SelectField
        style={this.style}
        floatingLabelText="Exercises"
        value={value}
        onChange={this.handleExerciseChange}
      >
        {this.exercises.map(exercise => <MenuItem
          key={exercise.id}
          value={exercise.id}
          primaryText={exercise.name} />)}
      </SelectField>
    );
  }
});

export default Exercises;
