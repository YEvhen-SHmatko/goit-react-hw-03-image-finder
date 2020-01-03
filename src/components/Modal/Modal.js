import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from './Modal.module.css';

export default class Modal extends Component {
  static propTypes = {
    status: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    element: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPressESC);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPressESC);
  }

  handleKeyPressESC = e => {
    if (e.keyCode === 27) {
      this.props.closeModal();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { element, status } = this.props;
    return (
      <>
        {status && (
          <>
            <div
              className={Styles.Overlay}
              onClick={this.handleBackdropClick}
              role="presentation"
            >
              <div className={Styles.Modal}>
                <img src={element.url} alt={element.alt} />
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
