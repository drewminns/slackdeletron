import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';

class FileContainer extends Component {
  static propTypes = {};

  render() {
    return <div />;
  }
}

function mapStateToProps({ auth, files }) {
  return {
    files: files.files,
  };
}

export default connect(mapStateToProps, actions)(FileContainer);
