import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from './actions';

import Header from './Components/Header';

class Main extends Component {
  static propTypes = {
    userAuth: PropTypes.func,
    loggedIn: PropTypes.bool,
  };

  componentDidMount() {
    this.props.userAuth();
  }

  renderLogin = () => {
    if (!this.props.loggedIn) {
      return <a href="/api/slack/login">Login With Slack</a>;
    }

    return <a href="/api/logout">Logout</a>;
  };

  render() {
    return <Header>{this.renderLogin()}</Header>;
  }
}

function mapStateToProps({ auth }) {
  return {
    loggedIn: auth.loggedIn,
    name: auth.profile.name,
    avatar: auth.profile.avatar,
  };
}

export default connect(mapStateToProps, actions)(Main);
