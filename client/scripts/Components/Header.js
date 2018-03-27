import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ isLoggedIn }) => {
  let button = <a href="/api/slack/login">Login With Slack</a>;
  if (isLoggedIn) {
    button = <a href="/api/logout">Logout</a>;
  }
  return <header>{button}</header>;
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default Header;
