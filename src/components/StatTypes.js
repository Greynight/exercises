import React from 'react';
import { observer } from 'mobx-react';

import { List, ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import { yellow500 } from 'material-ui/styles/colors';

const StatTypes = observer(class StatTypes extends React.Component {
  constructor(props) {
    super(props);

    this.store = props.store;
  }

  onTypeChange = (event) => {
    let type = event.currentTarget.id;
    this.store.setType(type);
  };

  getIconColor = (type) => {
    let color = '';

    if (type === this.store.getType()) {
      color = yellow500;
    }

    return color;
  };

  render() {
    let activeExerciseId = this.store.activeExercise;
    let activeExercise = this.store.getExercises().filter(exercise => exercise.id === activeExerciseId)[0];
    let dataTypes = activeExercise.dataTypes;

    return (
      <List>
        {dataTypes.map(datatype => <ListItem
          id={datatype.id}
          key={datatype.id}
          primaryText={datatype.name}
          onClick={this.onTypeChange}
          leftIcon={<ActionGrade color={this.getIconColor(datatype.id)} />}
        />)}
      </List>
    );
  }
});

export default StatTypes;
