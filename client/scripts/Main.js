import React, { Component, Fragment } from 'react';
import axios from 'axios';

import FileProvider from './Providers/FileProvider';
import Header from './Components/Header';
import FileContainer from './Containers/FileContainer';

import { ENDPOINT } from '../../config/constants';

export default class Main extends Component {
  state = {
    loggedIn: false,
    profile: {},
    channels: {
      list: [],
      cursor: '',
    },
    token: '',
    isAdmin: false,
    loading: true,
  };

  componentDidMount = async () => {
    await this.getUserAuth();
    await this.getChannels(this.state.token);
  };

  getChannels = async (token) => {
    if (token.length) {
      const res = await axios.get(`${ENDPOINT}/channels.list`, {
        params: {
          token: this.state.token,
          exclude_members: true,
          exclude_archived: true,
          limit: 200,
        },
      });
      this.setState({
        channels: {
          list: res.data.channels,
          cursor: res.data.response_metadata.next_cursor,
        },
      });
    }
  };

  getUserAuth = async () => {
    try {
      const res = await axios.get('/api/profile');

      if (res.data.loggedIn) {
        this.setState({
          profile: res.data.profile,
          loggedIn: true,
          loading: false,
          token: res.data.profile.accessToken,
        });
      } else {
        this.setState({
          profile: {},
          loggedIn: false,
          loading: false,
        });
      }
    } catch (err) {
      this.setState({
        profile: {},
        loggedIn: false,
        loading: false,
      });
    }
  };

  render() {
    return (
      <Fragment>
        <Header
          isLoggedIn={this.state.loggedIn}
          name={this.state.profile.name}
          avatar={this.state.profile.avatar}
          loading={this.state.loading}
        />
        <FileProvider
          accessToken={this.state.profile.accessToken}
          channels={this.state.channels.list}
        >
          <FileContainer />
        </FileProvider>
      </Fragment>
    );
  }
}
