import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grid-styled';
import styled from 'styled-components';
import moment from 'moment';

import { formatBytes } from '../utils';

const Card = styled.article``;
const CardImage = styled.figure`
  width: 100%;
  margin: 0;

  img {
    max-width: 100%;
  }
`;

function renderImage(file) {
  let image = null;

  switch (file.mimetype) {
    case 'image/jpeg':
      image = <img src={file.thumb_480} alt={file.name} />;
      break;
    case 'image/gif':
      image = <img src={file.thumb_360_gif} alt={file.name} />;
      break;
    default:
      image = <p>No Image</p>;
      break;
  }

  return image;
}

const File = ({ details, deleteFile }) => {
  const date = moment.unix(details.created).format('MMM Do YYYY h:mma');
  return (
    <Box width={1 / 4} m={2}>
      <Card>
        <CardImage>{renderImage(details)}</CardImage>
        <p>{details.name}</p>
        <p>
          Created:
          {date}
        </p>
        <p>Size: {formatBytes(details.size)}</p>
        <button
          onClick={() => {
            deleteFile(details.id);
          }}
        >
          Delete File
        </button>
      </Card>
    </Box>
  );
};

File.propTypes = {
  details: PropTypes.object,
  deleteFile: PropTypes.func,
};

export default File;
