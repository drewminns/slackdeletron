import React from 'react';
import PropTypes from 'prop-types';
import { formatBytes } from '../utils';

const Count = ({ data, teamName }) => {
  const amount = data.length;
  const fileSize = data.reduce((count, file) => {
    return count + file.size;
  }, 0);
  return (
    <div className="Count">
      <p className="Count__Text">
        There are <span className="purple">{amount} files</span> you can delete
        from your {teamName} workspace.
      </p>
      <p className="Count__Text">
        It could save you <span className="red">{formatBytes(fileSize)}</span>
      </p>
    </div>
  );
};

Count.propTypes = {
  data: PropTypes.array,
  teamName: PropTypes.string,
};

export default Count;
