import React from 'react';
import PropTypes from 'prop-types';

const PREFIXES = ['Woah!', 'Bummer!', 'Dang!', 'Oops!'];
const PREFIX = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];

const ErrorBar = ({ message, styles, present }) => {
  return (
    <div className="Error" style={styles}>
      <p>{present ? `${PREFIX} ${message}` : 'ok bye!'}</p>
    </div>
  );
};

ErrorBar.propTypes = {
  message: PropTypes.string,
  styles: PropTypes.object,
  present: PropTypes.bool,
};

export default ErrorBar;
