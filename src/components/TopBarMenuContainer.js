import { connect } from 'react-redux';
import TopBarMenu from './TopBarMenu';

import {
  dataDialogShowAction,
} from './../redux/actions';

const mapDispatchToProps = (dispatch) => ({
  handleDataDialogShow: () => {
    dispatch(dataDialogShowAction());
  }
});

const TopBarMenuContainer = connect(null, mapDispatchToProps)(TopBarMenu);

export default TopBarMenuContainer;
