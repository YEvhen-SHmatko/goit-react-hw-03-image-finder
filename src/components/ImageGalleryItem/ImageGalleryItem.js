import React from 'react';
import PropTypes from 'prop-types';
import Styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imageURL, alt, largeImageURL, onClick }) => {
  return (
    <li
      onClick={onClick}
      role="presentation"
      className={Styles.ImageGalleryItem}
    >
      <img
        src={imageURL}
        alt={alt}
        data={largeImageURL}
        className={Styles['ImageGalleryItem-image']}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  imageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
