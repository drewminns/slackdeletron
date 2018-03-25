import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import { withRouter } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <a href="/api/slack/login">Login With Slack</a>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    loggedIn: auth.loggedIn,
  };
}

export default connect(mapStateToProps)(Home);
