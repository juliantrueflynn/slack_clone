import React from 'react';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';
import ScrollBar from '../ScrollBar';
import ModalHeader from '../ModalHeader';
import './styles.css';

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

    const overlayClassName = classNames('Modal__overlay', {
      [`Modal__overlay--${modalFor}`]: modalFor,
      [`Modal__overlay--${modalFor}-${bemModifier}`]: modalFor && bemModifier,
      'Modal__overlay--styled': !unStyled,
      'Modal__overlay--unstyled': unStyled,
      'Modal__overlay--pos': modalPos,
    });

    const modalClassNames = classNames('Modal', {
      [`Modal__${modalFor}`]: modalFor,
      [`Modal__${modalFor}--${bemModifier}`]: modalFor && bemModifier,
      'Modal--styled': !unStyled,
      'Modal--unstyled': unStyled,
    });

    return (
      <ReactModal
        className={modalClassNames}
        overlayClassName={overlayClassName}
        contentLabel={modalTitle}
        onRequestClose={close}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        shouldReturnFocusAfterClose={false}
        {...props}
      >
        <div className="Modal__container">
          <Button buttonFor="close" modifier="overlay" unStyled onClick={this.handleClose}>
            <FontAwesomeIcon icon="times" />
          </Button>
          {!unStyled && (
            <ScrollBar>
              <ModalHeader modalTitle={modalTitle} close={this.handleClose} />
              <div className="Modal__body">
                {children}
              </div>
            </ScrollBar>
          )}
          {unStyled && children}
        </div>
      </ReactModal>
    );
  }
}

export default Modal;
