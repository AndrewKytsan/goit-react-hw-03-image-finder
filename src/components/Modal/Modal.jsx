import React, { Component } from 'react';
import s from './Modal.module.scss';
import PropTypes from 'prop-types';
export default class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.closeModal);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.closeModal);
    }

    closeModal = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    };
    clickOverlay = e => {
        if (e.target.nodeName !== 'IMG') {
            this.props.onClose();
        }
    };
    render() {
        const { largeImage } = this.props;
        return (
            <div className={s.Overlay} onClick={this.clickOverlay}>
                <div className={s.Modal}>
                    <img src={largeImage} alt="" />
                </div>
            </div>
        );
    }
}
Modal.propTypes = {
    largeImage: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};
