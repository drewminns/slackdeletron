import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CheckboxWrapper = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const CheckboxInput = styled.input`
  display: inline-block;
  margin-right: 8px;
`;

const CheckboxLabel = styled.label`
  font-size: 16px;
  display: inline-block;
`;

const Checkbox = ({ type, label, onChange, isChecked }) => {
  return (
    <CheckboxWrapper>
      <CheckboxInput
        type="checkbox"
        id={type}
        checked={isChecked}
        onChange={onChange}
        value={type}
      />
      <CheckboxLabel htmlFor={type}>{label}</CheckboxLabel>
    </CheckboxWrapper>
  );
};

Checkbox.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
};

export default Checkbox;
