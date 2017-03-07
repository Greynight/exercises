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
    return (
      <List>
        <ListItem
          id="calories"
          primaryText="Calories"
          onClick={this.onTypeChange}
          leftIcon={<ActionGrade color={this.getIconColor("calories")} />} />
        <ListItem
          id="time"
          primaryText="Time"
          onClick={this.onTypeChange}
          leftIcon={<ActionGrade color={this.getIconColor("time")} />}
        />
        <ListItem
          id="distance"
          primaryText="Distance"
          onClick={this.onTypeChange}
          leftIcon={<ActionGrade color={this.getIconColor("distance")} />} />
      </List>
    );
  }
});

export default StatTypes;
