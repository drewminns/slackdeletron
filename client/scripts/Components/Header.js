import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '../Components/Button';

const Header = ({ isLoggedIn = false, name = '', avatar = '' }) => {
  let markup = null;

  if (isLoggedIn && name && avatar) {
    markup = (
      <Fragment>
        <p className="Header__Name">Hey {name}</p>
        <img className="Header__Avatar" src={avatar} alt={name} />
        <Button text="Logout" href="api/logout" isLink />
      </Fragment>
    );
  } else {
    markup = (
      <Fragment>
        <Button text="Login with Slack" href="api/slack/login" isLink />
      </Fragment>
    );
  }

  return (
    <header className="Header">
      <h1 className="Header__Logo">Slack Deletron</h1>
      <div className="Header__Meta"> {markup}</div>
    </header>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  name: PropTypes.string,
  avatar: PropTypes.string,
};

export default Header;
