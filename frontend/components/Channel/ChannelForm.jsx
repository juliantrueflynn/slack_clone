import React from 'react';
import Modal from 'react-modal';
import FormErrors from '../Layout/FormErrors';
import './ChannelForm.css';

class ChannelForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      isModalOpen: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    Modal.setAppElement('#root');
    
    let nextState = {
      title: prevState.title,
      isModalOpen: nextProps.isModalOpen
    };
    
    if (!nextProps.isModalOpen && prevState.isModalOpen) {
      if (!nextProps.isModalOpen && prevState.isModalOpen) {
        nextState.title = '';
        return nextState;
      }
    }
    
    return nextState;
  }

  handleModalClose(event) {
    event.preventDefault();
    this.props.modalClose();
    this.setState({ title: '' });
  }

  handleInputValue(property) {
    return event => this.setState({ [property]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { workspaceSlug } = this.props;
    const channel = { title: this.state.title, workspaceId: workspaceSlug };
    this.props.createChannelRequest(channel);
  }

  render() {
    return (
      <Modal
        className="modal modal__new-channel"
        isOpen={this.state.isModalOpen}
        onRequestClose={this.handleModalClose}
        style={{
          overlay: { backgroundColor: 'white' },
          content: { border: 'none' },
        }}
        contentLabel="Create channel"
      >
        <button className="modal__close" onClick={this.handleModalClose}>
          &#10006;
        </button>
        <header className="modal__header">
          <h1 className="modal__title">Create a channel</h1>
        </header>

        <FormErrors entity="channel" />

        <form
          className="form form__new-channel"
          onSubmit={this.handleSubmit}
        >
          <p>
            Channels are where your members communicate. They're best when
            organized around a topic — #leads, for example.
          </p>
          <div className="form__group">
            <label>Name</label>
            <input
              type="text"
              placeholder="e.g. leads"
              value={this.state.title}
              onChange={this.handleInputValue('title')}
            />
          </div>
          <button
            className="button button__modal"
            onClick={this.handleModalClose}
          >
            Close
          </button>
          <input
            className="button button__modal"
            type="submit"
            value="Create Channel"
          />
        </form>
      </Modal>
    );
  }
}

export default ChannelForm;