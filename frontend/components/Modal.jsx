import React, { Fragment } from 'react';
import classNames from 'classnames';
import ReactModal from 'react-modal';
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
      bemModifier,
      modalPos,
      modalTitle,
      close,
      unStyled,
      children,
      ...props
    } = this.props;

    const shouldCloseOnOverlayClick = !!unStyled;

    const bodyOpenClassName = classNames('Modal__wrapper', {
      'ReactModal__Body--open': true,
      [`Modal__wrapper--${modalFor}`]: modalFor,
      [`Modal__wrapper--${modalFor}-${bemModifier}`]: modalFor && bemModifier,
      'Modal__wrapper--styled': !unStyled,
      'Modal__wrapper--pos': modalPos,
    });
    const modalClassNames = classNames('Modal', {
      [`Modal__${modalFor}`]: modalFor,
      [`Modal__${modalFor}--${bemModifier}`]: modalFor && bemModifier,
    });

    return (
      <ReactModal
        className={modalClassNames}
        overlayClassName="Modal__overlay"
        bodyOpenClassName={bodyOpenClassName}
        contentLabel={modalTitle}
        onRequestClose={close}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        shouldReturnFocusAfterClose={false}
        {...props}
      >
        <Fragment>
          {unStyled || (
            <Button buttonFor="close" modifier="overlay" unStyled onClick={this.handleClose}>
              <span role="img" aria-label="Close modal">&times;</span>
            </Button>
          )}
          {modalTitle && (
            <header className="Modal__header">
              <div className="Modal__header-inner">
                <h2 className="Modal__title">{modalTitle}</h2>
                <Button buttonFor="close" modifier="header" unStyled onClick={this.handleClose}>
                  <span role="img" aria-label="Close modal">&times;</span>
                </Button>
              </div>
            </header>
          )}
          {children}
        </Fragment>
      </ReactModal>
    );
  }
}

export default Modal;
