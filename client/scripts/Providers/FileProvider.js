import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import throttle from 'lodash.throttle';

import { ENDPOINT } from '../../../config/constants';

const INITIAL_STATE = {
  files: [],
  deletedSize: 0,
  paging: {
    total: 0,
    page: 1,
    pages: 1,
  },
  currentPage: 1,
  rate_time: 0,
  rate_count: 0,
  hasRun: false,
  hasFiles: false,
  searchDetails: {
    from: null,
    to: null,
    types: null,
    channel: null,
  },
};

export const FileContext = createContext();

export default class FileProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    // eslint-disable-next-line
    accessToken: PropTypes.string,
    channels: PropTypes.array,
    isLoggedIn: PropTypes.bool,
    updateError: PropTypes.func,
    isAdmin: PropTypes.bool,
    userId: PropTypes.string,
  };

  state = { ...INITIAL_STATE };

  componentWillUnmount() {
    clearInterval(this.myTimer);
  }

  getFiles = (from = null, to = null, types = null, channel = null) => {
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

    this.setState(
      {
        searchDetails: {
          from: fromValue,
          to: toValue,
          types,
          channel,
        },
      },
      () => {
        this.callGetFiles();
      }
    );
  };

  startTimer = () => {
    if (this.state.rate_count >= 25 && this.state.rate_time) {
      this.props.updateError(
        'Slow down that trigger finger, Slack has a rate limit of 50 calls every minute.'
      );
      return false;
    }

    if (!this.state.rate_time) {
      this.myTimer = setTimeout(this.timer.bind(this), 15000);
      this.setState({ rate_time: true, rate_count: 1 });
    }

    return true;
  };

  timer = () => {
    this.setState({ rate_time: false, rate_count: 0 });
  };

  // ### TODO Refactor the shit out of this
  callGetFiles = throttle(async () => {
    if (await !this.startTimer()) {
      return;
    }

    try {
      const res = await axios.get(`${ENDPOINT}files.list`, {
        params: {
          token: this.props.accessToken,
          user: !this.props.isAdmin ? this.props.userId : null,
          ts_from: this.state.searchDetails.from,
          ts_to: this.state.searchDetails.to,
          page: this.state.currentPage,
          types: this.state.searchDetails.types.length
            ? this.state.searchDetails.types
            : null,
          channel: this.state.searchDetails.channel.length
            ? this.state.searchDetails.channel
            : null,
        },
      });

      if (!res.data.ok) {
        this.props.updateError('Slack says no :(', 'GetFiles returned not ok');
        return;
      }

      // If results are completely empty, reset the page count
      if (!res.data.files.length) {
        this.setState({
          files: [],
          hasFiles: false,
          hasRun: true,
          currentPage: 1,
          rate_count: this.state.rate_count + 1,
        });
        return;
      }

      this.setState({
        files: res.data.files,
        hasFiles: res.data.files.length > 0,
        hasRun: true,
        paging: res.data.paging,
        rate_count: this.state.rate_count + 1,
      });
    } catch (err) {
      this.props.updateError(
        'Slack looks like it is down :(',
        `getFiles - ${err}`
      );
      this.setState({
        files: [],
        paging: INITIAL_STATE.paging,
        rate_count: this.state.rate_count + 1,
      });
    }
  }, 100);

  handlePageUpdate = (pageNumber) => {
    this.setState({ currentPage: pageNumber }, () => {
      this.callGetFiles();
    });
  };

  callDeleteFile = throttle(async (fileId) => {
    if (!this.startTimer()) {
      return;
    }

    try {
      const res = await axios.get(`${ENDPOINT}files.delete`, {
        params: {
          token: this.props.accessToken,
          file: fileId,
        },
      });
      this.setState({ rate_count: this.state.rate_count + 1 });

      if (!res.data.ok) {
        this.props.updateError(
          'Slack said no :(. Try it again',
          'callDeleteFile - res was not ok'
        );
      } else {
        this.deleteFile(fileId);
      }
    } catch (err) {
      this.props.updateError(
        'You must be logged in!',
        `callDeleteFile - ${err}`
      );
    }
  }, 1000);

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
          getFiles: this.getFiles,
          deleteFile: this.callDeleteFile,
          handlePageUpdate: this.handlePageUpdate,
        }}
      >
        {this.props.children}
      </FileContext.Provider>
    );
  }
}
