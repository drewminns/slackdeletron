import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { FileContext } from '../../Providers/FileProvider';
import Form from '../Form/Form';
import File from '../../Components/File/File';
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
              <div className="columns">
                <div className="column is-one-quarter">
                  <Form getFiles={context.getFiles} />
                </div>
                <div className="column">
                  {this.renderFiles(context.state.files, context.deleteFile)}
                </div>
              </div>
            </Fragment>
          )}
        </FileContext.Consumer>
      </div>
    );
  }
}

export default FileContainer;
