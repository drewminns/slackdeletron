import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '../Components/Button';

import keys from '../../../config/keys';

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
        <a
          className="LoginButton"
          href={`https://slack.com/oauth/authorize?client_id=${process.env
            .SLACK_CLIENT_ID ||
            keys.slackClientID}&scope=channels:read,files:read,files:write:user,users:read`}
        >
          <img
            alt="Sign in with Slack"
            height="40"
            width="172"
            src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
            srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
          />
        </a>
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
