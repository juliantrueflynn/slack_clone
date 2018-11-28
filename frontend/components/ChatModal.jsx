import React from 'react';
import Button from './Button';
import withForm from './withForm';
import Modal from './Modal';
import './ChatModal.css';

class ChatModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputValue(property) {
    return event => this.setState({ [property]: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { title } = this.state;
    const { workspaceId, formDispatchRequest } = this.props;
    formDispatchRequest({ title, workspaceId });
  }

  render() {
    const { modalClose } = this.props;
    const { title } = this.state;

    return (
      <Modal isOpen modalTitle="Create a Channel" modalFor="chat" close={modalClose}>
        <form className="ChatModal" onSubmit={this.handleSubmit}>
          <p className="Form__text">
            Channels are where your members communicate.
            They&#39;re best when organized around a topic — #leads, for example.
          </p>
          <div className="Form__group">
            <label htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="Form__control"
              placeholder="e.g. leads"
              value={title}
              onChange={this.handleInputValue('title')}
            />
          </div>
          <div className="Btn__group">
            <Button buttonFor="modal" size="lg" onClick={() => modalClose()}>
              Close
            </Button>
            <Button type="submit" buttonFor="modal" modifier="submit" size="lg" color="green">
              Create Channel
            </Button>
          </div>
        </form>
      </Modal>
    );
  }
}

const formProps = { type: 'CHANNEL_CREATE_REQUEST', payloadName: 'channel' };

export default withForm(formProps)(ChatModal);
