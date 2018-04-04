import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import Button from '../Components/Button';

import { WHITE, BOX_SHADOW } from '../style';
import Logo from '../../images/logo.svg';

const HeaderLogo = styled.h1`
  font-size: 0;

  &:before {
    background-image: url(${Logo});
    background-size: cover;
    content: '';
    display: block;
    height: 73px;
    width: 280px;
  }
`;

const HeaderBar = styled.header`
  background-color: ${WHITE};
  box-shadow: ${BOX_SHADOW};
  padding: 20px 40px;
`;

const HeaderAvatar = styled.img`
  border-radius: 50%;
  width: 73px;
  height: 73px;
  margin-right: 30px;
`;

const HeaderName = styled.p`
  margin-right: 20px;
`;

const Header = ({ isLoggedIn = false, name = '', avatar = '' }) => {
  let markup = null;

  if (isLoggedIn && name && avatar) {
    markup = (
      <Fragment>
        <HeaderName>Hey {name}</HeaderName>
        <HeaderAvatar src={avatar} alt={name} />
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
    <HeaderBar>
      <Flex>
        <Flex width={1 / 2} alignItems="center">
          <HeaderLogo>Slack Deletron</HeaderLogo>
        </Flex>
        <Flex alignItems="center" ml="auto">
          {markup}
        </Flex>
      </Flex>
    </HeaderBar>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  name: PropTypes.string,
  avatar: PropTypes.string,
};

export default Header;
