import React from 'react';
import { observer } from 'mobx-react';

import CircularProgress from 'material-ui/CircularProgress';
import { Flex, Box } from 'reflexbox';

const Loader = observer(class Loader extends React.Component {
  constructor(props) {
    super();

    this.styles = {
      backdrop: {
        backgroundColor: 'LightGrey',
        width: '100%',
        height: '100%',
        zIndex: 1000,
        minHeight: props.minHeight || 0
      }
    };
  }
  render() {
    return (
      <Flex style={this.styles.backdrop} align="center" justify="center">
        <Box>
          <CircularProgress
            mode="indeterminate"
            size={80}
            thickness={5}
          />
        </Box>
      </Flex>
    );
  }
});

export default Loader;
