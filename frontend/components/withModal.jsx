import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Modal from 'react-modal';
import Button from './Button';
import { modalClose } from '../actions/uiActions';
import './WithModal.css';

const withModal = ({
  modalTitle,
  modalType,
  unStyled,
  ...modalOptions
}) => (WrappedComponent) => {
  const mapStateToProps = state => ({
    isOpen: state.ui.displayModal.modalType === modalType,
    modalProps: state.ui.displayModal.modalProps,
  });

  const mapDispatchToProps = dispatch => ({
    modalClose: () => dispatch(modalClose()),
  });

  class WithModal extends React.Component {
    componentDidMount() {
      Modal.setAppElement('#root');
    }

    render() {
      const {
        isOpen,
        modalClose: close,
        modalProps,
        ...props
      } = this.props;

      const handleClose = () => close();
      const style = {
        content: { border: 'none' },
      };

      const lowerCaseType = modalType.toLowerCase();
      const typeClassName = lowerCaseType.slice(6);

      const overlayClassNames = classNames('Modal__overlay', {
        'Modal__overlay--unstyled': unStyled,
        'Modal__overlay--styled': !unStyled,
        [`Modal__overlay--${typeClassName}`]: typeClassName,
      });

      const modalClassNames = classNames('Modal', {
        [`Modal__${typeClassName}`]: typeClassName,
      });

      return (
        <Modal
          className={modalClassNames}
          style={style}
          contentLabel={modalTitle}
          isOpen={isOpen}
          shouldCloseOnOverlayClick={false}
          onRequestClose={handleClose}
          overlayClassName={overlayClassNames}
          {...modalOptions}
        >
          <div className="Modal__body">
            {unStyled || (
              <Button buttonFor="close" unStyled onClick={handleClose}>
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
              <WrappedComponent modalClose={close} {...modalProps} {...props} />
            </div>
          </div>
        </Modal>
      );
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithModal);
};

export default withModal;
