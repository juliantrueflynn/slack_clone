import React from 'react';
import Label from './Label';
import Button from './Button';
import Form from './Form';
import withModal from './withModal';
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

  handleSubmit(event) {
    event.preventDefault();

    const { title } = this.state;
    const { workspaceId, createChannelRequest } = this.props;
    createChannelRequest({ title, workspaceId });
  }

  render() {
    const { title } = this.state;
    const { onRequestClose } = this.props;

    return (
      <Form formFor="channel" onSubmit={this.handleSubmit}>
        <p className="Form__text">
          Channels are where your members communicate.
          They&#39;re best when organized around a topic — #leads, for example.
        </p>
        <div className="Form__group">
          <Label htmlFor="name">
            Name
          </Label>
          <input
            id="name"
            type="text"
            placeholder="e.g. leads"
            value={title}
            onChange={this.handleInputValue('title')}
          />
        </div>
        <Button buttonFor="modal" onClick={() => onRequestClose()}>
          Close
        </Button>
        <Button buttonFor="modal" type="submit">
          Create Channel
        </Button>
      </Form>
    );
  }
}

const modalProps = {
  modalType: 'MODAL_CHAT',
  modalTitle: 'Create a Channel'
};

export default withModal(modalProps)(ChatModal);
