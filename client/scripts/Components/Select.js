import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BLACK, WHITE, BOX_SHADOW, PRIMARY_FONT } from '../style';

const Select = ({
  label = '',
  emptyText = '',
  emptyValue = '',
  options = [],
  onChange = () => {},
  value = '',
  isLarge = false,
  darkLabel = false,
}) => {
  let optionEl = [];

  if (emptyText.length) {
    optionEl.push({ id: emptyValue || '', name: emptyText });
  }

  var optionValues = [...optionEl, ...options];

  return (
    <SelectDiv>
      <SelectLabel darkLabel={darkLabel}>{label}</SelectLabel>
      <SelectEl onChange={onChange} value={value} isLarge={isLarge}>
        {optionValues.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </SelectEl>
    </SelectDiv>
  );
};

const SelectDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SelectLabel = styled.label`
  display: inline-block;
  ${(props) =>
    props.darkLabel
      ? `
        background-color: ${BLACK}; 
        color: ${WHITE};
        padding: 8px 12px
        font-size: 18px;
        margin-bottom: 13px;
        box-shadow: ${BOX_SHADOW};
        `
      : `
        color: ${BLACK};
        padding: 3px 0;
        font-size: 16px;
        `};
`;

const SelectEl = styled.select`
  appearance: none;
  background-color: ${WHITE};
  border: 6px solid ${BLACK};
  border-radius: 0;
  box-shadow: ${BOX_SHADOW};
  font-family: ${PRIMARY_FONT};
  font-weight: 700;
  ${(props) =>
    props.isLarge
      ? `
        display: block;
        font-size: 22px;
        padding: 7px 30px 7px 7px;
        `
      : `
        display: inline-block;
        font-size: 14px;
        padding: 3px 30px 3px 10px
      `};
`;

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  emptyText: PropTypes.string,
  emptyValue: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  isLarge: PropTypes.bool,
  darkLabel: PropTypes.bool,
};

export default Select;
