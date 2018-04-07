import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { FileContext } from '../Providers/FileProvider';
import Form from './Form';
import FileWrapper from './FileWrapper';

class FileContainer extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    accessToken: PropTypes.string,
  };

  render() {
    return (
      <FileContext.Consumer>
        {(context) => (
          <Fragment>
            <main className="MainContent cf">
              <Form
                getFiles={context.getFiles}
                channels={context.channels}
                isLoggedIn={context.isLoggedIn}
              />
              <FileWrapper
                files={context.state.files}
                deleteFile={context.deleteFile}
                deletedSize={context.state.deletedSize}
              />
            </main>
          </Fragment>
        )}
      </FileContext.Consumer>
    );
  }
}

export default FileContainer;
