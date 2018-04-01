import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Label } from 'rebass';

const CheckboxEl = ({ type, label, onChange, isChecked }) => {
  return (
    <Label>
      <Checkbox
        id={type}
        checked={isChecked}
        onChange={onChange}
        value={type}
      />
      {label}
    </Label>
  );
};

CheckboxEl.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
};

export default CheckboxEl;
