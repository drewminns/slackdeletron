import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const ENDPOINT = 'https://slack.com/api/';

const INITIAL_STATE = {
  files: [],
  error: {
    present: false,
    message: '',
  },
};

export const FileContext = createContext();

export default class FileProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    isLoggedIn: PropTypes.bool,
    accessToken: PropTypes.string,
  };

  state = { ...INITIAL_STATE };

  callGetFiles = async (
    from = null,
    to = null,
    types = null,
    channel = null
  ) => {
    try {
      const res = await axios.get(`${ENDPOINT}files.list`, {
        params: {
          token: this.props.accessToken,
          from,
          to,
          types,
          channel,
        },
      });

      this.setState({
        files: res.data.files,
        error: INITIAL_STATE.error,
      });
    } catch (err) {
      this.setState({
        files: [],
        error: {
          present: true,
          message: 'You must log in!',
        },
      });
    }
  };

  callDeleteFile = async (fileId) => {
    try {
      const res = await axios.get(`${ENDPOINT}files.delete`, {
        params: {
          token: this.props.accessToken,
          file: fileId,
        },
      });

      if (res.data.ok) {
        this.deleteFile(fileId);
      }
    } catch (err) {
      this.setState({
        error: {
          present: true,
          message: 'Error Deleting File',
        },
      });
    }
  };

  deleteFile = (fileId) => {
    const filteredFiles = this.state.files.filter((item) => item.id !== fileId);
    if (!filteredFiles.length) {
      this.setState({ files: [], error: INITIAL_STATE.error });
      return;
    }

    this.setState({ files: filteredFiles, error: INITIAL_STATE.error });
  };

  render() {
    return (
      <FileContext.Provider
        value={{
          state: this.state,
          getFiles: this.callGetFiles,
          deleteFile: this.callDeleteFile,
        }}
      >
        {this.props.children}
      </FileContext.Provider>
    );
  }
}
