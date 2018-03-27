import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from './actions';

import Header from './Components/Header';

class Main extends Component {
  static propTypes = {
    userAuth: PropTypes.func,
    getFiles: PropTypes.func,
    deleteFile: PropTypes.func,
    loggedIn: PropTypes.bool,
    files: PropTypes.array,
  };

  componentDidMount() {
    this.props.userAuth();
  }

  getFiles = () => {
    this.props.getFiles();
  };

  deleteFile = (fileId) => {
    this.props.deleteFile(fileId);
  };

  displayFiles = () => {
    return this.props.files.map((file) => {
      return (
        <li key={file.id}>
          <img src={file.thumb_360} alt={file.title} />
          {file.title}
          <button onClick={() => this.deleteFile(file.id)}>Delete File</button>
        </li>
      );
    });
  };

  render() {
    return (
      <Fragment>
        <Header isLoggedIn={this.props.loggedIn} />
        <main>
          <button onClick={this.getFiles}>Get Files</button>
          <ul>{this.displayFiles()}</ul>
        </main>
      </Fragment>
    );
  }
}

function mapStateToProps({ auth, files }) {
  return {
    loggedIn: auth.loggedIn,
    name: auth.profile.name,
    avatar: auth.profile.avatar,
    token: auth.profile.accessToken,
    userId: auth.profile.userId,
    teamId: auth.profile.teamId,
    files: files.files,
  };
}

export default connect(mapStateToProps, actions)(Main);
