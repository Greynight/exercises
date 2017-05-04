import React from 'react';
import { observer } from 'mobx-react';

import AppBarMenu from './TopBarMenu';
import AppBar from 'material-ui/AppBar';

const TopBar = observer(class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.store = props.store;
  }

  render() {
    return (
      <AppBar
        title="Orbitrack statistics"
        iconElementRight={<AppBarMenu store={this.store} />}
        showMenuIconButton={false}
      />
    );
  }
});

export default TopBar;
