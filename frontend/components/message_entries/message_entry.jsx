import React from 'react';
import { ActionCable } from 'react-actioncable-provider';

class MessageEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMouseOver: false,
      body: this.props.message.body,
    };

    this.handleMouseEnterHover = this.handleMouseEnterHover.bind(this);
    this.handleMouseLeaveHover = this.handleMouseLeaveHover.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleCloseEdit = this.handleCloseEdit.bind(this);
    this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this);
    this.handleMessageEditSuccess = this.handleMessageEditSuccess.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleDeleteSuccess = this.handleDeleteSuccess.bind(this);
  }

  handleInputValue(property) {
    return event => this.setState({ [property]: event.target.value });
  }

  handleMouseEnterHover() {
    this.setState({ isMouseOver: true });
  }

  handleMouseLeaveHover() {
    this.setState({ isMouseOver: false });
  }
  
  handleEditClick(event) {
    event.preventDefault();
    this.props.openEditMessage(this.props.message);
  }

  handleCloseEdit(event) {
    event.preventDefault();
    this.props.closeEditMessage();
  }

  handleMessageEditSuccess(message) {
    if (message.id === this.props.editId) {
      this.props.closeEditMessage();
    }
  }

  handleEditFormSubmit(event) {
    event.preventDefault();
    
    const message = {
      id: this.props.message.id,
      body: this.state.body,
    };

    this.refs.roomChannelMessageEdit.perform('update', message);
  }

  handleDeleteClick(event) {
    event.preventDefault();
    const { message } = this.props;
    this.refs.roomChannel.perform('delete', message);
  }

  handleDeleteSuccess(message) {
    this.props.deleteMessageSuccess(message.id);
  }


  render() {
    const { message, isEditing, editId, deleteMessageSuccess } = this.props;
    const plainMessage = this.state.isMouseOver && <div>
      <ActionCable
        ref="roomChannel"
        channel={{ channel: 'ChatChannel' }}
        onReceived={ this.handleDeleteSuccess }
      />
      <button>Start thread</button>
      <button onClick={ this.handleEditClick }>Edit message</button>
      <button onClick={ this.handleDeleteClick }>Delete message</button>
    </div>;
    const editMessageForm = <form onSubmit={ this.handleEditFormSubmit }>
      <div>
        <ActionCable
          ref="roomChannelMessageEdit"
          channel={{ channel: 'ChatChannel' }}
          onReceived={ this.handleMessageEditSuccess }
        />
        <textarea
          value={ this.state.body }
          onChange={ this.handleInputValue('body') }
        />
      </div>
      <button onClick={ this.handleCloseEdit }>Cancel</button>
      <input type="submit" value="Save changes" />
    </form>;

    return (
      <li
        className="message"
        onMouseEnter={ this.handleMouseEnterHover }
        onMouseLeave={ this.handleMouseLeaveHover }
      >
        { isEditing && message.id === editId ? editMessageForm : plainMessage }
        { message.id } -
        { message.authorId }
        { message.body }
      </li>
    );
  }
}

export default MessageEntry;