import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'grid-styled';
import Button from '../Components/Button';

const Header = ({ isLoggedIn, name, avatar }) => {
  let markup = (
    <Fragment>
      <Button text="Login with Slack" href="api/slack/login" isLink />
    </Fragment>
  );

  if (isLoggedIn) {
    markup = (
      <Fragment>
        <img src={avatar} />
        <p>Hey {name}</p>
        <Button text="Logout" href="api/logout" isLink />
      </Fragment>
    );
  }

  return (
    <header>
      <Flex px={2} py={3}>
        <Flex width={1 / 2} alignItems="center">
          <h1>Slack Deletron</h1>
        </Flex>
        <Flex alignItems="center" ml="auto">
          {markup}
        </Flex>
      </Flex>
    </header>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  name: PropTypes.string,
  avatar: PropTypes.string,
};

export default Header;
