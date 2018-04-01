import React, { Component, Fragment } from 'react';
import axios from 'axios';

import FileProvider from './Providers/FileProvider';
import Header from './Components/Header/Header';
import FileContainer from './Containers/FileContainer/FileContainer';

export default class Main extends Component {
  state = {
    loggedIn: false,
    profile: {},
    loading: true,
  };

  componentDidMount() {
    this.getUserAuth();
  }

  getUserAuth = async () => {
    try {
      const res = await axios.get('/api/profile');

      if (res.data.loggedIn) {
        this.setState({
          profile: res.data.profile,
          loggedIn: true,
          loading: false,
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
        <FileProvider accessToken={this.state.profile.accessToken}>
          <main>
            <FileContainer />
          </main>
        </FileProvider>
      </Fragment>
    );
  }
}
