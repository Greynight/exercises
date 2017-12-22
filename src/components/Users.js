import React from 'react';
import Toggle from 'material-ui/Toggle';

const styles = {
  toggle: {
    marginBottom: 10,
    marginTop: 10
  }
};

const Users = ({ users, handleUserChange }) => {
  return (
    <div>
      {users.map(user => <Toggle
        style={styles.toggle}
        label={user.name}
        id={user.id}
        key={user.id}
        onToggle={handleUserChange}
        toggled={user.isActive}
      />)}
    </div>
  );
};

export default Users;
