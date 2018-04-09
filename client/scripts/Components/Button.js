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
  classes = '',
}) => {
  const classNames = cc(['Button', { Button__Large: large }, classes]);
  if (isLink && href) {
    return (
      <a href={href} className={classNames}>
        {text}
      </a>
    );
  }

  return (
    <button className={classNames} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  classes: PropTypes.string,
  onClick: PropTypes.func,
  isLink: PropTypes.bool,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  large: PropTypes.bool,
};

export default Button;
