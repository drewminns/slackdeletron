import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Filters from './Filters';
import File from '../Components/File';
import Count from '../Components/Count';

import friendlyBud from '../../images/friendlyBud.svg';
import stokedBud from '../../images/stokedBud.svg';
import congratsBud from '../../images/congratsBud.svg';

export default class FileWrapper extends Component {
  static propTypes = {
    deleteFile: PropTypes.func,
    files: PropTypes.array,
    teamName: PropTypes.string,
    hasRun: PropTypes.bool,
    hasFiles: PropTypes.bool,
  };

  state = {
    size: 'none',
    date: 'newest',
  };

  onSizeChange = (e) => {
    this.setState({
      size: e.target.value,
    });
  };

  onDateChange = (e) => {
    this.setState({
      date: e.target.value,
    });
  };

  displayFilters() {
    const files = this.props.files;
    if (!files.length) {
      return null;
    }

    return (
      <div className="FileWrapper__Bar">
        <Count data={files} teamName={this.props.teamName} />
        <Filters
          sizeValue={this.state.size}
          dateValue={this.state.date}
          onSizeChange={this.onSizeChange}
          onDateChange={this.onDateChange}
        />
      </div>
    );
  }

  renderFiles() {
    const files = this.props.files;
    if (this.state.size === 'smallest' && this.state.date === 'newest') {
      files.sort((a, b) => a.size > b.size && a.created < b.created);
    } else if (this.state.size === 'largest' && this.state.date === 'newest') {
      files.sort((a, b) => a.created < b.created && a.size < b.size);
    } else if (this.state.size === 'smallest' && this.state.date === 'oldest') {
      files.sort((a, b) => a.size > b.size && a.created > b.created);
    } else if (this.state.size === 'largest' && this.state.data === 'oldest') {
      files.sort((a, b) => a.size < b.size && a.created > b.created);
    } else if (this.state.date === 'newest') {
      files.sort((a, b) => a.created < b.created);
    } else if (this.state.date === 'oldest') {
      files.sort((a, b) => a.created > b.created);
    }

    return files.map((file) => (
      <div className="col-md-3" key={file.id}>
        <File
          details={file}
          deleteFile={this.props.deleteFile}
          className="col-md-4"
        />
      </div>
    ));
  }

  render() {
    if (!this.props.hasRun) {
      return (
        <div className="FileWrapper FileWrapper--start">
          <div className="FileWrapper__message">
            <img src={friendlyBud} alt="Slack Deletron Bud" />
            <h2>Oh hey, welcome to the Slack Deletron!</h2>

            <p className="lead">How to use this contraption</p>
            <ol>
              <li>
                Use the form to search the type of files you want to track down.
              </li>
              <li>
                Click the Get Files button to search for public files on your
                workspace.
              </li>
              <li>Start deleting some files and free up some space!</li>
            </ol>
          </div>
        </div>
      );
    } else if (this.props.files.length === 0 && this.props.hasFiles) {
      return (
        <div className="FileWrapper FileWrapper--start">
          <div className="FileWrapper__message">
            <img src={stokedBud} alt="Slack Deletron Bud" />
            <h2>Zap! Deleted!</h2>
            <p className="lead">You get them all from that search!</p>
            <p>Try another search to see if there is anything left!</p>
          </div>
        </div>
      );
    } else if (this.props.files.length === 0 && this.props.hasRun) {
      return (
        <div className="FileWrapper FileWrapper--start">
          <div className="FileWrapper__message">
            <img src={congratsBud} alt="Slack Deletron Bud" />
            <h2>Sweet! There is nothing there!</h2>
            <p className="lead">
              Usually no results is a bad thing, but this is great!
            </p>
            <p>Try another search to see if there is anything left!</p>
          </div>
        </div>
      );
    }

    return (
      <div className="FileWrapper">
        {this.displayFilters()}
        <div className="FileWrapper__List row">{this.renderFiles()}</div>
      </div>
    );
  }
}
