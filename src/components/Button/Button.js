import React from 'react';
import PropTypes from 'prop-types';
import Styles from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={Styles.Button}>
      <span>loade more</span>
    </button>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Button;
