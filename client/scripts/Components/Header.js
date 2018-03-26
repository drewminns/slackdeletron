import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ children }) => {
  return <div>{children}</div>;
};

Header.propTypes = {
  children: PropTypes.element,
};

export default Header;
