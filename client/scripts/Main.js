import React, { Component, Fragment } from 'react';
import axios from 'axios';

import FileProvider from './Providers/FileProvider';
import Header from './Components/Header';
import ErrorBar from './Components/ErrorBar';
import FileContainer from './Containers/FileContainer';

import { ENDPOINT } from '../../config/constants';

const INITIALSTATE = {
  loggedIn: false,
  profile: {},
  channels: {
    list: [],
    cursor: '',
  },
  token: '',
  isAdmin: false,
  loading: true,
  error: {
    present: false,
    message: '',
  },
};

export default class Main extends Component {
  state = INITIALSTATE;

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

  updateError = (present, message = '') => {
    this.setState({
      error: {
        present,
        message,
      },
    });
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
          error: {
            present: true,
            messaging: 'Endpoint down',
          },
        });
      }
    } catch (err) {
      this.setState({
        profile: {},
        loggedIn: false,
        loading: false,
        error: {
          present: true,
          messaging: 'Endpoint down',
        },
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
          isLoggedIn={this.state.loggedIn}
          teamName={this.state.profile.teamName}
          accessToken={this.state.profile.accessToken}
          channels={this.state.channels.list}
          updateError={this.updateError}
        >
          <FileContainer />
        </FileProvider>

        <ErrorBar message="Hello" shouldDisplay={this.state.error.present} />
      </Fragment>
    );
  }
}
