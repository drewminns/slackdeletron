import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SelectDiv = styled.div``;
const SelectLabel = styled.label``;
const SelectEl = styled.select``;

const Select = ({
  label = '',
  emptyText = '',
  emptyValue = '',
  options = [],
  onChange = () => {},
  value = '',
}) => {
  let optionEl = [];

  if (emptyText.length) {
    optionEl.push({ id: emptyValue || '', name: emptyText });
  }

  var optionValues = [...optionEl, ...options];

  return (
    <SelectDiv>
      <SelectLabel>{label}</SelectLabel>
      <SelectEl onChange={onChange} value={value}>
        {optionValues.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </SelectEl>
    </SelectDiv>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  emptyText: PropTypes.string,
  emptyValue: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
};

export default Select;
