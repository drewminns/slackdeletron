import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {
  static propTypes = {
    fetchUser: PropTypes.func,
    history: PropTypes.object,
    loggedIn: PropTypes.bool,
  };

  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return <div>Dashboard</div>;
  }
}

function mapStateToProps({ auth }) {
  return {
    loggedIn: auth.loggedIn,
  };
}

export default withRouter(connect(mapStateToProps, actions)(Dashboard));
