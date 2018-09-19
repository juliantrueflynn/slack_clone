import React from 'react';
import { Link } from 'react-router-dom';
import MessageHoverMenuContainer from './MessageHoverMenuContainer';
import Reactions from './Reactions';
import Avatar from './Avatar';
import MessageContent from './MessageContent';
import SingleMessageThread from './SingleMessageThread';
import './Message.css';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false };
    this.handleEditToggle = this.handleEditToggle.bind(this);
  }

  handleEditToggle(isEditing = false) {
    this.setState({ isEditing });
  }

  hasHover() {
    const { message: { id }, isReactionModalOpen, isMouseOver } = this.props;
    return id === isMouseOver && !isReactionModalOpen;
  }

  render() {
    const {
      match: { url },
      message,
      author,
      updateMessageRequest,
      reactions,
      threadMessages,
      createReactionRequest,
      users,
      isThreadHidden,
    } = this.props;
    const { isEditing } = this.state;

    if (!message) return null;

    const authorUrl = author && `${url}/team/${author.slug}`;
    let msgClassName = 'Message';
    if (isEditing) msgClassName += ' Message--editing';

    return (
      <div className={msgClassName} role="listitem">
        <Avatar baseUrl={url} author={author} />
        <div className="Message__body">
          <MessageHoverMenuContainer
            isEditing={isEditing}
            handleEditToggle={this.handleEditToggle}
            message={message}
          />
          <div className="Message__content">
            <div className="Message__content-meta">
              {author && (
                <Link to={authorUrl} className="Message__author">
                  {author.username}
                </Link>
              )}
              <time className="Message__time">
                {message.createdAt}
              </time>
            </div>
            <MessageContent
              isEditing={isEditing}
              content={message.body}
              updateMessageRequest={updateMessageRequest}
              closeEditor={this.handleEditToggle}
              messageSlug={message.slug}
            />
          </div>
          <Reactions
            createReactionRequest={createReactionRequest}
            reactions={reactions}
            messageId={message.id}
            users={users}
          />
          <SingleMessageThread
            matchUrl={url}
            messageSlug={message.slug}
            users={users}
            threadMessages={threadMessages}
            isThreadHidden={isThreadHidden}
          />
        </div>
      </div>
    );
  }
}

export default Message;
