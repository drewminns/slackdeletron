import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grid-styled';
import moment from 'moment';

import Button from '../Components/Button';
import { formatBytes } from '../utils';

function renderImage(file) {
  let image = null;

  switch (file.mimetype) {
    case 'image/jpeg':
      image = file.thumb_480;
      break;
    case 'image/gif':
      image = file.thumb_360_gif;
      break;
    default:
      image = 'https://commons.wikimedia.org/wiki/File:No_image_available.svg';
      break;
  }

  return image;
}

const File = ({ details, deleteFile }) => {
  const date = moment.unix(details.created).fromNow();
  return (
    <Box width={1 / 4} px={2} py={2}>
      <div>
        <img src={renderImage(details)} alt={details.name} />

        <h3>{details.name}</h3>
        <p>
          Created:
          {date}
        </p>
        <p>Size: {formatBytes(details.size)}</p>
        <Button
          text="Delete File"
          onClick={() => {
            deleteFile(details.id);
          }}
        />
      </div>
    </Box>
  );
};

File.propTypes = {
  details: PropTypes.object,
  deleteFile: PropTypes.func,
};

export default File;
