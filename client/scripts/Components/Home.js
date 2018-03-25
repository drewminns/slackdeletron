import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Home extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    // console.log(this.props);
    return <div>Home</div>;
  }
}

export default connect(null, actions)(Home);
