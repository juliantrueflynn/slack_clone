import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
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

      const lowerCaseType = modalType.toLowerCase();
      const typeClassName = lowerCaseType.slice(6);

      return (
        <Modal
          className={`Modal Modal__${typeClassName}`}
          style={style}
          contentLabel={modalTitle}
          shouldCloseOnOverlayClick={false}
          {...modalProps}
          {...this.props}
        >
          <div className="Modal__body">
            <Button className="Btn__close" onClick={this.handleModalClose}>
              <FontAwesomeIcon icon="times" size="2x" />
            </Button>
            <div className="Modal__inner-body">
              <header className="Modal__header">
                <h1 className="Modal__title">
                  {modalTitle}
                </h1>
              </header>
              <WrappedComponent {...this.props} />
            </div>
          </div>
        </Modal>
      );
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithModal);
};

export default withModal;
