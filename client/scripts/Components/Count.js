import React from 'react';
import PropTypes from 'prop-types';

import { formatBytes } from '../utils';

const Count = ({ data }) => {
  const amount = data.length;
  const fileSize = data.reduce((count, file) => {
    return count + file.size;
  }, 0);
  return (
    <div>
      <p>You got {amount} files</p>
      <p>{formatBytes(fileSize)}</p>
    </div>
  );
};

Count.propTypes = {
  data: PropTypes.array,
};

export default Count;
