import React, { Component } from 'react';
import imagesApi from './ApiService/imagesApi';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Loader from 'react-loader-spinner';
import s from './App.module.scss';

export default class App extends Component {
    state = {
        searchQuery: '',
        page: 1,
        results: [],
        loading: false,
        modalImage: null,
        firstRequest: true,
    };
    searchbarHandler = query => {
        this.setState({
            searchQuery: query,
            results: [],
            page: 1,
            firstRequest: true,
        });
    };
    componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevState.searchQuery;
        const nextQuery = this.state.searchQuery;

        prevQuery !== nextQuery && this.imagesRequest();
    }

    imagesRequest = () => {
        const { searchQuery, page } = this.state;

        this.setState({
            loading: true,
        });

        imagesApi
            .fetchImages(searchQuery, page)
            .then(images => {
                this.setState(prevState => ({
                    results: [...prevState.results, ...images],
                    page: prevState.page + 1,
                    loading: false,
                    firstRequest: false,
                }));
                if (!this.state.firstRequest) {
                    window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: 'smooth',
                    });
                }
            })
            .catch(error => console.log(error));
        // .finally(() => {
        //     this.setState({
        //         loading: false,
        //         firstRequest: false,
        //     });
        // });
    };

    openModal = largeImage => {
        this.setState({ modalImage: largeImage });
    };

    closeModal = e => {
        this.setState({ modalImage: null });
    };

    render() {
        const { results, loading, modalImage } = this.state;
        return (
            <div className={s.App}>
                <Searchbar onSubmit={this.searchbarHandler} />
                <ImageGallery images={results} onClick={this.openModal} />
                {modalImage && (
                    <Modal largeImage={modalImage} onClose={this.closeModal} />
                )}
                {loading && (
                    <div className={s.Loader}>
                        <Loader
                            type="Puff"
                            color="#00BFFF"
                            height={80}
                            width={80}
                        />
                    </div>
                )}
                {results.length > 0 && !loading && (
                    <Button onClick={this.imagesRequest} />
                )}
            </div>
        );
    }
}
