import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import { Flex, Box } from 'reflexbox';

const Loader = (props) => {
  const styles = {
    backdrop: {
      backgroundColor: 'LightGrey',
      width: '100%',
      height: '100%',
      zIndex: 1000,
      minHeight: props.minHeight || 0
    }
  };

  return (
    <Flex style={styles.backdrop} align="center" justify="center">
      <Box>
        <CircularProgress
          mode="indeterminate"
          size={80}
          thickness={5}
        />
      </Box>
    </Flex>
  );
};

export default Loader;
