import React from 'react';

import { observer } from 'mobx-react';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const AppBarMenu = observer(class AppBarMenu extends React.Component {
  constructor(props) {
    super(props);

    this.store = props.store;
  }

  // TODO show this button only to some users
  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Add more data" onTouchTap={this.store.showAddDataDialog} />
      </IconMenu>
    );
  }
});

export default AppBarMenu;
