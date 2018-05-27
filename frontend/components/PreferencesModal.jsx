import React from 'react';
import Modal from 'react-modal';
import FormErrors from './Layout/FormErrors';

class PreferencesModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      isOpen: false
    };

    this.handleModalClose = this.handleModalClose.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    Modal.setAppElement('#root');
    
    let nextState = {
      title: prevState.title,
      isOpen: nextProps.isModalOpen
    };
    
    if (!nextProps.isModalOpen && prevState.isOpen) {
      if (!nextProps.isModalOpen && prevState.isOpen) {
        nextState.title = '';
        return nextState;
      }
    }
    
    return nextState;
  }

  handleModalClose(event) {
    this.props.modalClose();
  }

  handleInputValue(property) {
    return event => this.setState({ [property]: event.target.value });
  }

  render() {
    const { workspaceSlug } = this.props;

    return (
      <Modal
        className="modal modal__new-channel"
        isOpen={this.state.isOpen}
        onRequestClose={this.handleModalClose}
        shouldCloseOnOverlayClick={false}
        style={{
          overlay: { backgroundColor: 'white' },
          content: { border: 'none' },
        }}
        contentLabel={`Workspace ${workspaceSlug} Preferences`}
      >
        <div className="modal-top-bar">
          <button className="btn btn__close" onClick={this.handleModalClose}>
            &#10006;
          </button>
          <header className="modal__header">
            <h1 className="modal__title">
              Your Preferences for {workspaceSlug}
            </h1>
          </header>
        </div>

        {/* <FormErrors entity="channel" /> */}

        <form
          className="form form__new-channel"
          onSubmit={this.handleSubmit}
        >
          <div className="form__group">
            <label>Name</label>
            <input
              type="text"
              placeholder="e.g. leads"
              value={this.state.title}
              onChange={this.handleInputValue('title')}
            />
          </div>
        </form>
      </Modal>
    );
  }
}

export default PreferencesModal;