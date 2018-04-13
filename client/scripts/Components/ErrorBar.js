import React from 'react';
import PropTypes from 'prop-types';
import cc from 'classcat';

const PREFIXES = ['Woah!', 'Bummer!', 'Dang!', 'Oops!'];
const PREFIX = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];

const ErrorBar = ({ message, present }) => {
  const classes = cc(['Error', { 'Error--present': present }]);
  return (
    <div className={classes}>
      <p>{present ? `${PREFIX} ${message}` : 'Ok, bye!'}</p>
    </div>
  );
};

ErrorBar.propTypes = {
  message: PropTypes.string,
  present: PropTypes.bool,
};

export default ErrorBar;
