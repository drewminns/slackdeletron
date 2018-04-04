import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonEl = styled.button``;
const ButtonLink = styled.a``;

const Button = ({
  text = '',
  onClick = () => {},
  isLink = false,
  href = '',
}) => {
  if (isLink) {
    return <ButtonLink href={href}>{text}</ButtonLink>;
  }

  return <ButtonEl onClick={onClick}>{text}</ButtonEl>;
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  isLink: PropTypes.bool,
  href: PropTypes.string,
};

export default Button;
