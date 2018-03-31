import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { FileContext } from '../Providers/FileProvider';
import Form from '../Components/Form';
import File from '../Components/File';
class FileContainer extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    accessToken: PropTypes.string,
  };

  renderFiles(files, deleteFile) {
    return files.map((file) => (
      <File details={file} key={file.id} deleteFile={deleteFile} />
    ));
  }

  render() {
    return (
      <div>
        <FileContext.Consumer>
          {(context) => (
            <Fragment>
              <Form getFiles={context.getFiles} />
              {this.renderFiles(context.state.files, context.deleteFile)}
            </Fragment>
          )}
        </FileContext.Consumer>
      </div>
    );
  }
}

export default FileContainer;
