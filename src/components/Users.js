import React from 'react';
import { observer } from 'mobx-react';

import Toggle from 'material-ui/Toggle';

const styles = {
  toggle: {
    marginBottom: 10,
    marginTop: 10
  }
};

const Users = observer(class Users extends React.Component {
  constructor(props) {
    super(props);

    this.store = props.store;
  }

  handleUserChanged = (event, isInputChecked) => {
    const users = this.store.activeUsers;
    const userId = event.currentTarget.id;
    users[userId] = isInputChecked;
  };

  render() {

    return (
      <div>
        {this.store.users.map(user => <Toggle
          style={styles.toggle}
          label={user.name}
          id={user.id}
          key={user.id}
          onToggle={this.handleUserChanged}
          defaultToggled={true}
        />)}
      </div>
    );
  }
});

export default Users;
