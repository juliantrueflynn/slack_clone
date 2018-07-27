import React from 'react';
import MessageHoverMenuContainer from '../MessageHoverMenuContainer';
import Reactions from '../Reactions';
import AuthorNameLink from '../AuthorNameLink';
import Avatar from '../Avatar';
import MessageContent from '../MessageContent';
import SingleMessageThread from './SingleMessageThread';
import './Message.css';

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
    return () => this.setState({ isMouseOver });
  }

  handleEditToggle(isEditing = false) {
    this.setState({ isEditing });
  }

  render() {
    const { message, author, ...props } = this.props;
    const { isMouseOver, isEditing } = this.state;

    if (!message || !author) {
      return null;
    }

    return (
      <div
        className={`msg ${isEditing ? 'msg--editing' : ''} ${isMouseOver && !isEditing ? 'msg--hover' : ''}`}
        onMouseEnter={this.handleHoverToggle(true)}
        onMouseLeave={this.handleHoverToggle(false)}
      >
        <Avatar baseUrl={props.match.url} author={author} />
        <div className="msg__body">
          <MessageHoverMenuContainer
            isMouseOver={isMouseOver}
            isEditing={isEditing}
            message={message}
            handleEditToggle={this.handleEditToggle}
          />
          <div className="msg__content">
            <div className="msg__content-meta">
              <AuthorNameLink baseUrl={props.match.url} author={author} />
              <time className="msg__time">
                {message.createdAt}
              </time>
            </div>
            <MessageContent
              isEditing={isEditing}
              content={message.body}
              updateMessageRequest={props.updateMessageRequest}
              closeEditor={this.handleEditToggle}
              messageSlug={message.slug}
            />
          </div>
          {(!props.isSingleMessage || message.parentMessageId) && (
            <div className="msg__footer">
              <Reactions reactions={props.reactions} />
              <SingleMessageThread
                message={message}
                match={props.match}
                threadLastUpdate={props.threadLastUpdate}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Message;
