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

  onUserChanged = (event, isInputChecked) => {
    let users = this.store.getUsers();
    let user = event.currentTarget.id;
    users[user] = isInputChecked;

    this.store.setUsers(users);
  };

  render() {
    return (
      <div><Toggle
        style={styles.toggle}
        label="Ivan"
        id="ivan"
        onToggle={this.onUserChanged}
        defaultToggled={true}
      />
      <Toggle
        style={styles.toggle}
        label="Marina"
        id="marina"
        onToggle={this.onUserChanged}
        defaultToggled={true}
      /></div>
    );
  }
});

export default Users;
