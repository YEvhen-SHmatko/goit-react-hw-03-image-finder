import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import * as API from '../../services/api';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';

export default class App extends Component {
  state = {
    images: [],
    searchValue: '',
    page: 1,
    isLoading: false,
    isModal: false,
    imageId: null,
    error: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchValue, page } = this.state;
    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      this.getDataApi(searchValue, page);
    }
  }

  getDataApi = (text, page) => {
    let scrollHeight = 0;
    if (page === 1) {
      scrollHeight = 0;
    } else {
      scrollHeight = document.documentElement.scrollHeight - 144;
    }
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
        const { images } = this.state;
        if (images.length < 1) {
          this.setState({ error: true });
        } else {
          this.setState({ error: false });
        }
        this.setState({ isLoading: false });
        window.scrollTo({
          top: scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  handleSearchOnSubmit = text => {
    this.setState({ searchValue: text, images: [], page: 1 });
  };

  handleClickOnMore = () => {
    const { page } = this.state;
    this.setState({
      page: page + 1,
    });
  };

  handleClickIsOpenModal = id => {
    this.setState({
      isModal: true,
      imageId: id,
    });
  };

  handleClickIsCloseModal = e => {
    this.setState({
      isModal: false,
    });
  };

  render() {
    const { images, isLoading, isModal, imageId, error } = this.state;
    const mapper = massive => {
      return massive.map(e => ({
        imageURL: e.webformatURL,
        ...e,
      }));
    };
    const fined = (massive, id) => {
      return massive.find(e => e.id === id);
    };
    const imgModal = fined(images, imageId);
    return (
      <>
        {isModal && (
          <Modal closeModal={this.handleClickIsCloseModal}>
            <img src={imgModal.largeImageURL} alt={imgModal.tags} />
          </Modal>
        )}
        <Searchbar onSubmit={this.handleSearchOnSubmit} />
        <ImageGallery
          data={mapper(images)}
          openModal={this.handleClickIsOpenModal}
        />
        {error && <Error>Image not found!</Error>}
        {isLoading && <Loader />}
        {images.length > 0 && <Button onClick={this.handleClickOnMore} />}
      </>
    );
  }
}
