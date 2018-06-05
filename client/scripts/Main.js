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
  user_id: '',
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
    await this.getPrivateGroups(this.state.token);
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Raven.captureException(error, { extra: errorInfo });
    Raven.showReportDialog();
  }

  getUserAuth = async () => {
    try {
      const res = await axios.get('/api/profile');

      if (res.data.ok) {
        this.setState({
          profile: res.data.user.profile,
          loggedIn: true,
          loading: false,
          token: res.data.token,
          user_id: res.data.user_id,
          isAdmin: res.data.user.is_admin,
        });
      } else {
        this.setState({
          profile: {},
          loggedIn: false,
          loading: false,
        });
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

  getChannels = async (token) => {
    if (token.length) {
      const res = await axios.get(`${ENDPOINT}channels.list`, {
        params: {
          token: this.state.token,
          exclude_members: true,
          exclude_archived: true,
          limit: 200,
        },
      });
      const newChannels = this.state.channels.list.concat(res.data.channels);
      this.setState({
        channels: {
          list: newChannels,
          cursor: res.data.response_metadata.next_cursor,
        },
      });
    }
  };

  getPrivateGroups = async (token) => {
    if (token.length) {
      const res = await axios.get(`${ENDPOINT}groups.list`, {
        params: {
          token: this.state.token,
          exclude_members: true,
          exclude_archived: true,
        },
      });

      if (res.data.ok) {
        const newGroups = this.state.channels.list.concat(res.data.groups);

        this.setState({
          channels: {
            list: newGroups,
          },
        });
      }
    }
  };

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
          name={this.state.profile.first_name}
          isAdmin={this.state.isAdmin}
          avatar={this.state.profile.image_192 || this.state.profile.image_72}
          loading={this.state.loading}
        />
        <FileProvider
          isLoggedIn={this.state.loggedIn}
          teamName={this.state.profile.teamName}
          userId={this.state.user_id}
          accessToken={this.state.token}
          isAdmin={this.state.isAdmin}
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
