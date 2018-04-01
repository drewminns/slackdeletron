import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ isLoggedIn, name, avatar, loading }) => {
  let button = <a href="/api/slack/login">Login With Slack</a>;
  let text = null;
  let image = null;

  let markup = (
    <div className="navbar-item">
      <div className="field is-grouped">
        <div className="control">
          <button className="is-primary is-loading">Loading</button>
        </div>
      </div>
    </div>
  );

  if (isLoggedIn) {
    markup = (
      <div className="navbar-item">
        <div className="field is-grouped">
          <div className="control">
            <figure className="image is-48x48">
              <img src={avatar} alt={name} />
            </figure>
          </div>
          <div className="control">
            <a href="/api/logout" className="button is-danger">
              Logout
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    markup = (
      <div className="navbar-item">
        <div className="field is-grouped">
          <div className="control">
            <a href="/api/slack/login" className="button is-link">
              Login With Slack
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <header className="navbar is-fixed-top is-black">
      <div className="container is-fluid">
        <div className="navbar-brand">Slack Deletron</div>
        <div className="navbar-end">{markup}</div>
      </div>
    </header>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  name: PropTypes.string,
};

export default Header;
