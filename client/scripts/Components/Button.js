import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BLACK, BLACK_LIGHT, WHITE } from '../style';

const ButtonEl = styled.div`
  display: inline-block;

  a,
  button {
    display: inline-block;
    appearance: none;
    cursor: pointer;
    padding: 10px 15px;
    background-color: ${BLACK};
    color: ${WHITE};
    text-decoration: none;
    transition: background 0.8s;
    border-radius: 5px;

    background-color: ${(props) => (props.color ? props.color : null)};

    &:hover {
      background: ${BLACK_LIGHT};
    }
  }
`;

const Button = ({ text = '', onClick = () => {}, link, color }) => {
  let el = (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );

  if (link) {
    el = <a href={link}>{text}</a>;
  }

  return <ButtonEl color={color}>{el}</ButtonEl>;
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  link: PropTypes.string,
  color: PropTypes.string,
};

export default Button;
