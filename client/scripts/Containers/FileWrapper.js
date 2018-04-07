import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Filters from './Filters';
import File from '../Components/File';
import Count from '../Components/Count';

export default class FileWrapper extends Component {
  static propTypes = {
    deleteFile: PropTypes.func,
    files: PropTypes.array,
    deletedSize: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      size: 'none',
      date: 'none',
    };
  }

  onSizeChange = (e) => {
    this.setState({
      size: e.target.value,
      date: 'none',
    });
  };

  onDateChange = (e) => {
    this.setState({
      date: e.target.value,
      size: 'none',
    });
  };

  displayFilters() {
    const files = this.props.files;
    if (!files.length) {
      return null;
    }
    return (
      <div className="FileWrapper__Bar">
        <Count data={files} deletedSize={this.props.deletedSize} />
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
    if (this.state.size === 'smallest') {
      files.sort((a, b) => a.size > b.size);
    } else if (this.state.size === 'largest') {
      files.sort((a, b) => a.size < b.size);
    }

    if (this.state.date === 'newest') {
      files.sort((a, b) => a.created < b.created);
    } else if (this.state.date === 'oldest') {
      files.sort((a, b) => a.created > b.created);
    }

    return files.map((file) => (
      <div className="col-md-4" key={file.id}>
        <File
          details={file}
          deleteFile={this.props.deleteFile}
          className="col-md-4"
        />
      </div>
    ));
  }

  render() {
    return (
      <div className="FileWrapper">
        {this.displayFilters()}
        <div className="FileWrapper__List row">{this.renderFiles()}</div>
      </div>
    );
  }
}
