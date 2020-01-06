import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from './Searchbar.module.css';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    value: '',
  };

  handleOnChange = e => {
    this.setState({ value: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { value } = this.state;
    onSubmit(value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    return (
      <header className={Styles.Searchbar}>
        <form onSubmit={this.handleOnSubmit} className={Styles.SearchForm}>
          <button type="submit" className={Styles['SearchForm-button']}>
            <span className={Styles['SearchForm-button-label']}>Search</span>
          </button>

          <input
            className={Styles['SearchForm-input']}
            onChange={this.handleOnChange}
            value={value}
            type="text"
            autoComplete="off"
            // autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
