import React from 'react';
import Button from './Button';
import withModal from './withModal';
import FormErrors from './FormErrors';
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
    const { workspaceId, createChannelRequest } = this.props;
    createChannelRequest({ title, workspaceId });
  }

  render() {
    const { title } = this.state;
    const { onRequestClose } = this.props;

    return (
      <form className="ChatModal" onSubmit={this.handleSubmit}>
        <FormErrors entity="channel" />
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
            placeholder="e.g. leads"
            value={title}
            onChange={this.handleInputValue('title')}
          />
        </div>
        <div className="Btn__group">
          <Button buttonFor="modal" size="lg" onClick={() => onRequestClose()}>
            Close
          </Button>
          <Button type="submit" buttonFor="modal" modifier="submit" size="lg" color="green">
            Create Channel
          </Button>
        </div>
      </form>
    );
  }
}

const modalProps = {
  modalType: 'MODAL_CHAT',
  modalTitle: 'Create a Channel'
};

export default withModal(modalProps)(ChatModal);
