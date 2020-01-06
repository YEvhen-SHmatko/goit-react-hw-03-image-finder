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
            <ImageGalleryItem data={item} onClick={openModal} key={item.id} />
          ))}
        </ul>
      )}
    </>
  );
};
ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};
export default ImageGallery;
