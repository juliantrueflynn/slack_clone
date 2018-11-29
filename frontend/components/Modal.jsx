import React from 'react';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import './Modal.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    const { close } = this.props;
    close();
  }

  render() {
    const {
      modalFor,
      modalPos,
      modalTitle,
      darkOverlay,
      lightOverlay,
      close,
      unStyled,
      children,
      ...props
    } = this.props;

    const style = { content: { border: 'none' } };
    const overlayClassNames = classNames('Modal__overlay', {
      'Modal__overlay--unstyled': unStyled,
      'Modal__overlay--styled': !unStyled,
      [`Modal__overlay--${modalFor}`]: modalFor,
      [`Modal__overlay--pos-${modalPos}`]: modalPos,
      'Modal__overlay--dark': darkOverlay,
      'Modal__overlay--light': lightOverlay,
    });
    const modalClassNames = classNames('Modal', {
      [`Modal__${modalFor}`]: modalFor,
      'Modal--has-pos': modalPos,
      [`Modal__pos-${modalPos}`]: modalPos,
    });

    return (
      <ReactModal
        style={style}
        className={modalClassNames}
        overlayClassName={overlayClassNames}
        contentLabel={modalTitle}
        onRequestClose={this.handleClose}
        shouldCloseOnOverlayClick
        {...props}
      >
        <div className="Modal__body">
          {unStyled || (
            <Button buttonFor="close" unStyled onClick={this.handleClose}>
              <FontAwesomeIcon icon="times" size="2x" />
            </Button>
          )}
          <div className="Modal__inner-body">
            {modalTitle && (
              <header className="Modal__header">
                <h1 className="Modal__title">
                  {modalTitle}
                </h1>
              </header>
            )}
            {children}
          </div>
        </div>
      </ReactModal>
    );
  }
}

export default Modal;
