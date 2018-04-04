import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BLACK, WHITE, BOX_SHADOW } from '../style';

const ButtonEl = styled.button`
  background-color: ${BLACK};
  color: ${WHITE};
  font-weight: 500;
  box-shadow: ${BOX_SHADOW};
  padding: 12px 20px;
  cursor: pointer;
  font-size: ${(props) => (props.large ? '26px' : '18px')};
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
`;
const ButtonLink = styled.a`
  background-color: ${BLACK};
  color: ${WHITE};
  text-decoration: none;
  font-weight: 500;
  box-shadow: ${BOX_SHADOW};
  padding: 12px 20px;
  font-size: ${(props) => (props.large ? '26px' : '18px')};
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
`;

const Button = ({
  text = '',
  onClick = () => {},
  isLink = false,
  href = '',
  large = false,
  fullWidth = false,
}) => {
  if (isLink && href) {
    return (
      <ButtonLink href={href} large={large} fullWidth={fullWidth}>
        {text}
      </ButtonLink>
    );
  }

  return (
    <ButtonEl onClick={onClick} large={large} fullWidth={fullWidth}>
      {text}
    </ButtonEl>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  isLink: PropTypes.bool,
  href: PropTypes.string,
  large: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

export default Button;
