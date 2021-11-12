import React from 'react';
import s from './ImageGalleryItem.module.scss';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ smallImg, largeImg, onClick }) => {
    return (
        <li className={s.ImageGalleryItem}>
            <img
                className={s.ImageGalleryItemImage}
                src={smallImg}
                alt=""
                onClick={() => onClick(largeImg)}
            />
        </li>
    );
};

ImageGalleryItem.proptype = {
    smallImg: PropTypes.string.isRequired,
    largeImg: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
