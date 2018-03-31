import React, { Component, Fragment } from 'react';
import axios from 'axios';

import FileProvider from './Providers/FileProvider';
import Header from './Components/Header';
// import Form from './Components/Form';
import FileContainer from './Components/FileContainer';

class Main extends Component {
  state = {
    loggedIn: false,
    profile: {},
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
        });
      } else {
        this.setState({
          profile: {},
          loggedIn: false,
        });
      }
    } catch (err) {
      this.setState({
        profile: {},
        loggedIn: false,
      });
    }
  };

  render() {
    return (
      <Fragment>
        <Header isLoggedIn={this.state.loggedIn} />
        <FileProvider
          isLoggedIn={this.state.loggedIn}
          accessToken={this.state.profile.accessToken}
        >
          <Fragment>
            <main>
              <FileContainer />
            </main>
          </Fragment>
        </FileProvider>
      </Fragment>
    );
  }
}

export default Main;
