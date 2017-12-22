import React from 'react';

import TopBarMenuContainer from './TopBarMenuContainer';
import AppBar from 'material-ui/AppBar';

const TopBar = () => {
  return (
    <AppBar
      title="Exercises statistics"
      iconElementRight={<TopBarMenuContainer />}
      showMenuIconButton={false}
    />
  );
};

export default TopBar;
