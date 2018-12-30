import React, { Fragment } from 'react';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import ScrollBar from './ScrollBar';
import ModalHeader from './ModalHeader';
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
      'Modal__wrapper--unstyled': unStyled,
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
          <Button buttonFor="close" modifier="overlay" unStyled onClick={this.handleClose}>
            <FontAwesomeIcon icon="times" />
          </Button>
          {!unStyled && (
            <ScrollBar>
              <div className="Modal__container">
                <ModalHeader modalTitle={modalTitle} close={this.handleClose} />
                {children}
              </div>
            </ScrollBar>
          )}
          {unStyled && children}
        </Fragment>
      </ReactModal>
    );
  }
}

export default Modal;
