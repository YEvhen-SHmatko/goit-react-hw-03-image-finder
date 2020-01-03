import React, { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import Style from './Loader.module.css';

export default class App extends Component {
  state = {};

  render() {
    return (
      <div className={Style.spiner}>
        <Loader
          type="Puff"
          color="#3f51b5"
          height={100}
          width={100}
          // timeout={3000} // 3 secs
        />
      </div>
    );
  }
}
