import React from 'react';
import PropTypes from 'prop-types';
import cc from 'classcat';

const Button = ({
  text = '',
  onClick = () => {},
  isLink = false,
  href = '',
  disabled = false,
  large = false,
}) => {
  const classes = cc(['Button', { Button__Large: large }]);
  if (isLink && href) {
    return (
      <a href={href} className={classes}>
        {text}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  isLink: PropTypes.bool,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  large: PropTypes.bool,
};

export default Button;
