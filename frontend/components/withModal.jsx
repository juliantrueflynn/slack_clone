import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { camelize } from 'humps';
import Button from './Button';
import { modalClose } from '../actions/interactiveActions';
import './WithModal.css';

const withModal = ({ modalTitle, modalType, ...modalProps }) => (WrappedComponent) => {
  const mapStateToProps = state => ({
    isOpen: state.ui.displayModal === modalType,
  });

  const mapDispatchToProps = dispatch => ({
    onRequestClose: () => dispatch(modalClose()),
  });

  class WithModal extends React.Component {
    constructor(props) {
      super(props);
      this.handleModalClose = this.handleModalClose.bind(this);
    }

    componentWillMount() {
      Modal.setAppElement('#root');
    }

    handleModalClose() {
      const { onRequestClose } = this.props;
      onRequestClose();
    }

    render() {
      const style = {
        overlay: { backgroundColor: 'white' },
        content: { border: 'none' },
      };

      return (
        <Modal
          className={`Modal Modal__${camelize(modalType)}`}
          style={style}
          contentLabel={modalTitle}
          shouldCloseOnOverlayClick={false}
          {...modalProps}
          {...this.props}
        >
          <header className="Modal__header">
            <Button className="Btn__close" onClick={this.handleModalClose}>
              &#10006;
            </Button>
            <h1 className="Modal__title">
              {modalTitle}
            </h1>
          </header>
          <WrappedComponent {...this.props} />
        </Modal>
      );
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithModal);
};

export default withModal;
