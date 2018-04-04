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
      <Flex px={2} py={2}>
        <Box width={3 / 4}>
          <Count data={files} />
          <p>Files Deleted: {formatBytes(deletedSize)}</p>
        </Box>
        <Box width={1 / 4}>
          <Filters
            sizeValue={this.state.size}
            dateValue={this.state.date}
            onSizeChange={this.onSizeChange}
            onDateChange={this.onDateChange}
          />
        </Box>
      </Flex>
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
            <Box width={1 / 5} p={2}>
              <Form getFiles={context.getFiles} channels={context.channels} />
            </Box>
            <Box width={4 / 5} p={2}>
              {this.displayFilters(
                context.state.files,
                context.state.deletedSize
              )}
              <Flex flexWrap="wrap">
                {this.renderFiles(context.state.files, context.deleteFile)}
              </Flex>
            </Box>
          </Flex>
        )}
      </FileContext.Consumer>
    );
  }
}

export default FileContainer;
