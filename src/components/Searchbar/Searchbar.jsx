import React, { Component } from 'react';
import s from './Searchbar.module.scss';
import PropTypes from 'prop-types';
export default class Searchbar extends Component {
    state = {
        inputValue: '',
    };
    inputHandler = e => {
        this.setState({ inputValue: e.target.value });
    };
    formHandler = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.inputValue);
        this.setState({ inputValue: '' });
    };
    render() {
        return (
            <header className={s.Searchbar}>
                <form className={s.SearchForm} onSubmit={this.formHandler}>
                    <button type="submit" className={s.SearchFormButton}>
                        <span className={s.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        className={s.SearchFormInput}
                        type="text"
                        value={this.state.inputValue}
                        onChange={this.inputHandler}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        );
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
