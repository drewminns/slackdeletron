import React from 'react';
import PropTypes from 'prop-types';

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
  return (
    <div className="column is-one-quarter">
      <article className="card">
        <div className="card-image">
          <figure className="image is-4by3">{renderImage(details)}</figure>
        </div>
        <p>{details.name}</p>
        <button
          onClick={() => {
            deleteFile(details.id);
          }}
        >
          Delete File
        </button>
      </article>
    </div>
  );
};

File.propTypes = {
  details: PropTypes.object,
  deleteFile: PropTypes.func,
};

export default File;
