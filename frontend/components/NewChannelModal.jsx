import React from 'react';
import Modal from 'react-modal';
import Label from './Label';
import FormErrors from './Layout/FormErrors';
import './NewChannelModal.css';

class ChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('#root');
  }

  handleModalClose() {
    this.props.modalClose('NEW_CHANNEL_MODAL');
    this.setState({ title: '' });
  }

  handleInputValue(property) {
    return event => this.setState({ [property]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { workspaceId, createChannelRequest } = this.props;
    const channel = { title: this.state.title, workspaceId };
    createChannelRequest(channel);
  }

  render() {
    return (
      <Modal
        className="modal modal__new-channel"
        isOpen={this.props.isModalOpen}
        onRequestClose={this.handleModalClose}
        style={{ overlay: { backgroundColor: 'white' }, content: { border: 'none' } }}
        contentLabel="Create channel"
      >
        <button className="modal__close" onClick={this.handleModalClose}>
          &#10006;
        </button>
        <header className="modal__header">
          <h1 className="modal__title">Create a channel</h1>
        </header>

        <FormErrors entity="channel" />

        <form className="form form__new-channel" onSubmit={this.handleSubmit}>
          <p className="form__text">
            Channels are where your members communicate.
            They&#39;re best when organized around a topic — #leads, for example.
          </p>
          <div className="form__group">
            <Label htmlFor="name">Name</Label>
            <input
              id="name"
              type="text"
              placeholder="e.g. leads"
              value={this.state.title}
              onChange={this.handleInputValue('title')}
            />
          </div>
          <button className="btn btn__modal" onClick={this.handleModalClose}>Close</button>
          <button className="btn btn__modal" type="submit">Create Channel</button>
        </form>
      </Modal>
    );
  }
}

export default ChannelForm;
