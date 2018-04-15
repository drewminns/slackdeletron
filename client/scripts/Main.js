import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Raven from 'raven-js';
import { Transition } from 'react-transition-group';

import FileProvider from './Providers/FileProvider';
import Header from './Components/Header';
import ErrorBar from './Components/ErrorBar';
import FileContainer from './Containers/FileContainer';

import { ENDPOINT } from '../../config/constants';

const duration = 500;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
};

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
        this.setState(
          {
            profile: {},
            loggedIn: false,
            loading: false,
          },
          () => {
            this.updateError(
              // I know...
              // eslint-disable-next-line
              "Something's wrong. Try again later",
              'getUserAuth - Res did not include logged in value'
            );
          }
        );
      }
    } catch (err) {
      this.setState(
        {
          profile: {},
          loggedIn: false,
          loading: false,
        },
        () => {
          this.updateError(
            // I know...
            // eslint-disable-next-line
            "Something's wrong. Try again later",
            'getUserAuth catch block'
          );
        }
      );
    }
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Raven.captureException(error, { extra: errorInfo });
    Raven.showReportDialog();
  }

  updateError = (message = '', errorTrack = '') => {
    if (!message.length) {
      this.setState({ error: INITIALSTATE.error });
    }

    this.setState(
      {
        error: {
          present: true,
          message,
        },
      },
      () => {
        setTimeout(() => {
          this.setState({ error: INITIALSTATE.error });
        }, 5000);
      }
    );

    Raven.captureMessage(errorTrack);
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
        <Transition in={this.state.error.present} timeout={1000} unmountOnExit>
          {(state) => (
            <ErrorBar
              present={this.state.error.present}
              message={this.state.error.message}
              styles={{ ...defaultStyle, ...transitionStyles[state] }}
            />
          )}
        </Transition>
      </Fragment>
    );
  }
}
