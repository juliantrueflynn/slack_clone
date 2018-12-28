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
      hasDarkOverlay,
      close,
      unStyled,
      hasNoWrappers,
      children,
      ...props
    } = this.props;

    const style = { content: { border: 'none' } };
    const overlayClassName = classNames('Modal__overlay', {
      'Modal__overlay--styled': !unStyled,
      [`Modal__overlay--${modalFor}`]: modalFor,
      [`Modal__overlay--${modalFor}-${bemModifier}`]: modalFor && bemModifier,
      'Modal__overlay--pos': modalPos,
      [`Modal__overlay--pos-${modalPos}`]: modalPos,
    });
    const modalClassNames = classNames('Modal', {
      [`Modal__${modalFor}`]: modalFor,
      [`Modal__${modalFor}--${bemModifier}`]: modalFor && bemModifier,
      'Modal--has-pos': modalPos,
      [`Modal__pos-${modalPos}`]: modalPos,
    });
    const bodyOpenClassName = classNames('Modal__wrapper', {
      'ReactModal__Body--open': true,
      [`Modal__wrapper--${modalFor}`]: modalFor,
      [`Modal__wrapper--${modalFor}-${bemModifier}`]: modalFor && bemModifier,
    });

    return (
      <ReactModal
        style={style}
        className={modalClassNames}
        overlayClassName={overlayClassName}
        bodyOpenClassName={bodyOpenClassName}
        contentLabel={modalTitle}
        onRequestClose={close}
        shouldCloseOnOverlayClick
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
          {hasNoWrappers && children}
          {hasNoWrappers || <div className="Modal__body">{children}</div>}
        </Fragment>
      </ReactModal>
    );
  }
}

export default Modal;
