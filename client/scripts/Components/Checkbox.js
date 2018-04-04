import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CheckboxDiv = styled.div``;
const CheckboxLabel = styled.label``;
const CheckboxInput = styled.input``;

const Checkbox = ({
  label = '',
  checked = false,
  onChange = () => {},
  value = '',
}) => {
  return (
    <CheckboxDiv>
      <CheckboxLabel>
        <CheckboxInput
          id={value}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          value={value}
        />
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
