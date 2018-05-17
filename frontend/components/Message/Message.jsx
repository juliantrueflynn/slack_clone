import React from 'react';
import MessageEditForm from './MessageEditForm';
import MessageHoverMenu from './MessageHoverMenu';

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMouseOver: false,
      isEditing: false
    };

    this.handleEditToggle = this.handleEditToggle.bind(this);
  }

  handleHoverToggle(isMouseOver) {
    return event => this.setState({ isMouseOver });
  }

  handleEditToggle(toggleResult) {
    this.setState({ isEditing: toggleResult });
  }

  render() {
    const { message } = this.props;
    const { isMouseOver, isEditing } = this.state;
  
    return (
      <li
        className="message"
        onMouseEnter={this.handleHoverToggle(true)}
        onMouseLeave={this.handleHoverToggle(false)}
      >
        <div className="message__body">
          {isEditing && (
            <MessageEditForm
              message={this.props.message}
              toggleEditMessage={this.handleEditToggle}
              updateMessageRequest={this.props.updateMessageRequest}
            />
          )}
          {isMouseOver && !isEditing && (
            <MessageHoverMenu
              message={this.props.message}
              isUserAuthor={this.props.isUserAuthor}
              openRightSidebar={this.props.openRightSidebar}
              toggleEditMessage={this.handleEditToggle}
              deleteMessageRequest={this.props.deleteMessageRequest}
              match={this.props.match}
            />
          )}
          {!isEditing && (
            <div className="message-body">
              ID: #{this.props.message.id}<br/>
              Slug: {this.props.message.slug}<br/>
              Author: {this.props.message.authorId}<br/>
              Body: {this.props.message.body}
            </div>
          )}
        </div>
      </li>
    );
  }
}

export default Message;