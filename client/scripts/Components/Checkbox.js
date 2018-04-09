import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({
  label = '',
  checked = false,
  onChange = () => {},
  value = '',
}) => {
  return (
    <div className="Checkbox">
      <input
        className="Checkbox__Input"
        id={value}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        value={value}
      />
      <label className="Checkbox__Label" htmlFor={value} checked={checked}>
        {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default Checkbox;
