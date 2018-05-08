import React from 'react';

class Message extends React.Component {
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
    this.handleThreadOpenClick = this.handleThreadOpenClick.bind(this);
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
    this.props.closeEditMessage();
  }

  handleEditFormSubmit(event) {
    event.preventDefault();
    
    const message = {
      id: this.props.message.id,
      body: this.state.body,
    };

    this.props.editMessage(message);
  }

  handleDeleteClick(event) {
    event.preventDefault();
    
    const { message: { id }, deleteMessage } = this.props;
    deleteMessage(id);
  }

  handleThreadOpenClick(event) {
    event.preventDefault();
    
    this.props.openThread(this.props.message.id);
  }

  render() {
    const {
      message, isEditing, editId, currentUserId, deleteMessageSuccess
    } = this.props;

    let editMessageButton, deleteMessageButton;
    if (currentUserId === message.authorId) {
      editMessageButton = <button onClick={ this.handleEditClick }>
        Edit message
      </button>;
      deleteMessageButton = <button onClick={ this.handleDeleteClick }>
        Delete message
      </button>;
    }
    let plainMessage;
    if (this.state.isMouseOver) {
      plainMessage = <div>
        <button onClick={ this.handleThreadOpenClick }>Start thread</button>
        { editMessageButton }
        { deleteMessageButton }
      </div>;
    }
    const editMessageForm = <form onSubmit={ this.handleEditFormSubmit }>
      <div>
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

export default Message;