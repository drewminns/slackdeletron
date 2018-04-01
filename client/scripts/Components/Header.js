import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import Button from '../Components/Button';
import { BLACK, WHITE, BLUE } from '../style';

const HeaderWrap = styled.header`
  padding: 15px 25px;
  background: ${WHITE};
  color: ${BLACK};
`;

const HeaderTitle = styled.h1`
  font-size: 21px;
  margin: 0;
`;

const HeaderLoggedIn = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderUser = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;

  img {
    width: 64px;
    height: 64px;
    margin-right: 10px;
  }
`;

const Header = ({ isLoggedIn, name, avatar }) => {
  let markup = (
    <HeaderLoggedIn>
      <Button text="Login with Slack" link="api/slack/login" />
    </HeaderLoggedIn>
  );

  if (isLoggedIn) {
    markup = (
      <HeaderLoggedIn>
        <HeaderUser>
          <img src={avatar} alt={name} />
          <p>Hey {name}</p>
        </HeaderUser>
        <Button text="Logout" link="api/logout" color={BLUE} />
      </HeaderLoggedIn>
    );
  }

  return (
    <HeaderWrap>
      <Flex justifyContent={'space-between'}>
        <Flex width={1 / 2} alignItems="center">
          <HeaderTitle>Slack Deletron</HeaderTitle>
        </Flex>
        <Flex width={1 / 2} justifyContent={'flex-end'}>
          {markup}
        </Flex>
      </Flex>
    </HeaderWrap>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  name: PropTypes.string,
  avatar: PropTypes.string,
};

export default Header;
