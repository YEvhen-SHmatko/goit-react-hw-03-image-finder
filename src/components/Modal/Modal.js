import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Styles from './Modal.module.css';

export default class Modal extends Component {
  overlayRef = createRef();

  static propTypes = {
    children: PropTypes.node.isRequired,
    closeModal: PropTypes.func.isRequired,
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
    const { current } = this.overlayRef;
    if (e.target === current) {
      this.props.closeModal();
    }
  };

  render() {
    const { children } = this.props;
    return (
      <>
        <div
          className={Styles.Overlay}
          ref={this.overlayRef}
          onClick={this.handleBackdropClick}
          role="presentation"
        >
          <div className={Styles.Modal}>{children}</div>
        </div>
      </>
    );
  }
}
