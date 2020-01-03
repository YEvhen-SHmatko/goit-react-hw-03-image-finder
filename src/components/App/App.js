import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import * as API from '../../services/api';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';

export default class App extends Component {
  state = {
    images: [],
    searchValue: '',
    page: 1,
    isLoading: false,
    height: 0,
    isModal: false,
    imgIsModal: { url: '', alt: '' },
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchValue, page } = this.state;
    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      this.getDataApi(searchValue, page);
    }
  }

  getDataApi = (text, page) => {
    const { height } = this.state;
    this.setState({ isLoading: true });
    API.get(text, page)
      .then(({ data }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
        }));
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
        window.scrollTo({
          top: height - 142,
          behavior: 'smooth',
        });
      });
  };

  handleSearchOnSubmit = text => {
    this.setState({ searchValue: text, images: [], page: 1, height: 0 });
  };

  handleClickOnMore = () => {
    const { page } = this.state;
    const { scrollHeight } = document.documentElement;
    this.setState({
      page: page + 1,
      height: scrollHeight,
    });
  };

  handleClickIsOpenModal = e => {
    const url = e.target.attributes.data.value;
    const alt = e.target.attributes.alt.value;
    this.setState({
      imgIsModal: { url, alt },
      isModal: true,
    });
  };

  handleClickIsCloseModal = e => {
    this.setState({
      imgIsModal: { url: '', alt: '' },
      isModal: false,
    });
  };

  render() {
    const { images, isLoading, imgIsModal, isModal } = this.state;
    const mapper = massive => {
      return massive.map(e => ({
        imageURL: e.webformatURL,
        ...e,
      }));
    };
    return (
      <>
        <Modal
          status={isModal}
          element={imgIsModal}
          closeModal={this.handleClickIsCloseModal}
        />
        <Searchbar onSubmit={this.handleSearchOnSubmit} />
        <ImageGallery
          data={mapper(images)}
          openModal={this.handleClickIsOpenModal}
        />
        {isLoading && <Loader />}
        {images.length > 0 && <Button onClick={this.handleClickOnMore} />}
      </>
    );
  }
}
