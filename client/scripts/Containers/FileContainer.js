import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'grid-styled';

import { formatBytes } from '../utils';

import { FileContext } from '../Providers/FileProvider';
import Form from './Form';
import Filters from './Filters';
import File from '../Components/File';
import Count from '../Components/Count';

class FileContainer extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    accessToken: PropTypes.string,
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

  displayFilters(files, deletedSize) {
    if (!files.length) {
      return null;
    }
    return (
      <Fragment>
        <Count data={files} />
        <p>Files Deleted: {formatBytes(deletedSize)}</p>
        <Filters
          sizeValue={this.state.size}
          dateValue={this.state.date}
          onSizeChange={this.onSizeChange}
          onDateChange={this.onDateChange}
        />
      </Fragment>
    );
  }

  renderFiles(files, deleteFile) {
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
      <File details={file} key={file.id} deleteFile={deleteFile} />
    ));
  }

  render() {
    return (
      <FileContext.Consumer>
        {(context) => (
          <Flex>
            <Box width={1 / 5}>
              <Form getFiles={context.getFiles} />
              {this.displayFilters(
                context.state.files,
                context.state.deletedSize
              )}
            </Box>
            <Flex width={4 / 5}>
              {this.renderFiles(context.state.files, context.deleteFile)}
            </Flex>
          </Flex>
        )}
      </FileContext.Consumer>
    );
  }
}

export default FileContainer;
