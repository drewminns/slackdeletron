import React from 'react';
import PropTypes from 'prop-types';
import { formatBytes } from '../utils';

const Count = ({ data = [], teamName, total }) => {
  const amount = data.length;
  const fileSize = data.reduce((count, file) => {
    return count + file.size;
  }, 0);

  const messaging = total > 1 ? 'There are' : 'There is';
  const messagingHere = total > 1 ? 'Here are' : 'Here is';
  const plural = total > 1 ? 'files' : 'file';
  return (
    <div className="Count">
      <p className="Count__Text">
        {messaging}{' '}
        <span className="purple">
          {total} {plural}
        </span>{' '}
        you can delete from your workspace.
      </p>
      <p className="Count__Text">
        {messagingHere} {amount} worth{' '}
        <span className="red">{formatBytes(fileSize)}</span>
      </p>
    </div>
  );
};

Count.propTypes = {
  data: PropTypes.array,
  teamName: PropTypes.string,
  total: PropTypes.number,
};

export default Count;
