import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BLACK, WHITE, BOX_SHADOW } from '../style';
import Checkmark from '../../images/checkmark.svg';

const CheckboxDiv = styled.div`
  margin: 8px 0;
`;
const CheckboxLabel = styled.label`
  display: inline-block;
  background-color: ${BLACK}; 
  color: ${WHITE};
  padding: 8px 12px
  font-size: 18px;
  margin-bottom: 13px;
  margin-left: 50px;
  box-shadow: ${BOX_SHADOW};
  position: relative;

  &::before {
    position: absolute;
    left: -50px;
    top: 0;
    display: inline-block;
    border: 6px solid ${BLACK};
    content: '';
    width: 37px;
    height: 37px;
    background-color: ${WHITE};
    color: ${BLACK};
      padding: 2px 5px 4px 1px;
    content: ${(props) => (props.checked ? `url(${Checkmark})` : '')}
  }
`;
const CheckboxInput = styled.input`
  height: 0;
  width: 0;
  position: absolute;
`;

const Checkbox = ({
  label = '',
  checked = false,
  onChange = () => {},
  value = '',
}) => {
  return (
    <CheckboxDiv>
      <CheckboxInput
        id={value}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        value={value}
      />
      <CheckboxLabel htmlFor={value} checked={checked}>
        {label}
      </CheckboxLabel>
    </CheckboxDiv>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default Checkbox;
