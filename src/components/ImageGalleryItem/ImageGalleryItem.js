import React from 'react';
import PropTypes from 'prop-types';
import Styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ data, onClick }) => {
  // console.dir(data);
  return (
    <li
      onClick={() => onClick(data.id)}
      role="presentation"
      className={Styles.ImageGalleryItem}
    >
      <img
        src={data.imageURL}
        alt={data.tags}
        className={Styles['ImageGalleryItem-image']}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  data: PropTypes.shape({
    imageURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
