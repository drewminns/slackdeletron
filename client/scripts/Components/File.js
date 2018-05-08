import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import NoFileImage from '../../images/file.svg';
import Button from '../Components/Button';
import { formatBytes } from '../utils';

function renderImage(file) {
  switch (file.mimetype) {
    case 'image/jpeg':
      return file.thumb_480 || file.thumb_360;
    case 'image/png':
      return file.thumb_480 || file.thumb_360;
    case 'image/svg+xml':
      return file.url_private;
    case 'image/gif':
      return file.thumb_360_gif;
    default:
      return NoFileImage;
  }
}

const File = ({ details, deleteFile, style }) => {
  const date = moment.unix(details.created).fromNow();
  return (
    <article className="File" style={style}>
      <div className="File__Image">
        <div className="File__ImageType">{details.filetype}</div>
        <img
          className="File__ImageSource"
          src={renderImage(details)}
          alt={details.name}
        />
      </div>
      <div className="File__Details">
        <p className="File__Meta">
          {formatBytes(details.size)} / {date}
        </p>
        <h3 className="File__Title">{details.name}</h3>
        <Button
          text="Delete File"
          classes="File__Button"
          // I know...
          // eslint-disable-next-line
          onClick={() => {
            deleteFile(details.id);
          }}
          large
        />
      </div>
    </article>
  );
};

File.propTypes = {
  details: PropTypes.object,
  deleteFile: PropTypes.func,
  style: PropTypes.object,
};

export default File;
