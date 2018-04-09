import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';

import { ENDPOINT } from '../../../config/constants';

const INITIAL_STATE = {
  files: [],
  error: {
    present: false,
    message: '',
  },
  deletedSize: 0,
  paging: 1,
  hasRun: false,
  hasFiles: false,
};

export const FileContext = createContext();

export default class FileProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    accessToken: PropTypes.string,
    channels: PropTypes.array,
    isLoggedIn: PropTypes.bool,
    teamName: PropTypes.string,
  };

  state = { ...INITIAL_STATE };

  callGetFiles = async (
    from = null,
    to = null,
    types = null,
    channel = null
  ) => {
    const now = moment()
      .seconds(0)
      .milliseconds(0)
      .minutes(0);
    let fromValue, toValue;
    if (from) {
      fromValue = from ? moment(from).unix() : null;
    }

    if (to) {
      toValue = !moment(now).isSame(to) ? moment(to).unix() : null;
    }

    try {
      const res = await axios.get(`${ENDPOINT}files.list`, {
        params: {
          token: this.props.accessToken,
          ts_from: fromValue,
          ts_to: toValue,
          types,
          channel,
        },
      });

      this.setState({
        files: res.data.files,
        hasFiles: res.data.files.length > 0,
        error: INITIAL_STATE.error,
        hasRun: true,
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
    const file = this.state.files.filter((item) => item.id === fileId)[0];
    const filteredFiles = this.state.files.filter((item) => item.id !== fileId);
    const fileSize = file.size + this.state.deletedSize;
    if (!filteredFiles.length) {
      this.setState({
        files: [],
        error: INITIAL_STATE.error,
        deletedSize: fileSize,
      });
      return;
    }

    this.setState({
      files: filteredFiles,
      error: INITIAL_STATE.error,
      deletedSize: fileSize,
    });
  };

  render() {
    return (
      <FileContext.Provider
        value={{
          state: this.state,
          isLoggedIn: this.props.isLoggedIn,
          channels: this.props.channels,
          teamName: this.props.teamName,
          getFiles: this.callGetFiles,
          deleteFile: this.callDeleteFile,
        }}
      >
        {this.props.children}
      </FileContext.Provider>
    );
  }
}
