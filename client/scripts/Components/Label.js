import React from 'react';
import PropTypes from 'prop-types';
import cc from 'classcat';

const Label = ({ darkLabel, children, htmlFor }) => {
  const classes = cc(['Label', { Label__Dark: darkLabel }]);
  return (
    <label htmlFor={htmlFor} className={classes}>
      {children}
    </label>
  );
};

Label.propTypes = {
  darkLabel: PropTypes.bool,
  children: PropTypes.string,
  htmlFor: PropTypes.string,
};

export default Label;
