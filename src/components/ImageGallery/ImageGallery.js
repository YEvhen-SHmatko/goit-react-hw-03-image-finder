import React from 'react';
import PropTypes from 'prop-types';
import Styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ data, openModal }) => {
  return (
    <>
      {data.length > 0 && (
        <ul className={Styles.ImageGallery}>
          {data.map(item => (
            <ImageGalleryItem
              onClick={openModal}
              key={item.id}
              imageURL={item.imageURL}
              alt={item.tags}
              largeImageURL={item.largeImageURL}
            />
          ))}
        </ul>
      )}
    </>
  );
};
ImageGallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  openModal: PropTypes.func.isRequired,
};
export default ImageGallery;
