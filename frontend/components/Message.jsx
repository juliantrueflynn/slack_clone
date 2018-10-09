import React from 'react';
import { Link } from 'react-router-dom';
import MessageHoverMenu from './MessageHoverMenu';
import Reactions from './Reactions';
import Avatar from './Avatar';
import MessageContent from './MessageContent';
import SingleMessageThread from './SingleMessageThread';
import ChannelSub from './ChannelSub';
import { dateUtil } from '../util/dateUtil';
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
      updateMessageRequest,
      reactions,
      threadMessages,
      createReactionRequest,
      users,
      modalOpen,
      deleteMessageRequest,
      createFavoriteRequest,
      deleteFavoriteRequest,
      deleteReactionRequest,
      isThreadHidden,
      currentUser,
    } = this.props;
    const { isEditing } = this.state;

    if (!message) {
      return null;
    }

    const authorAvatar = { slug: message.authorSlug, username: message.authorName };
    const authorUrl = `${url}/team/${message.authorSlug}`;
    const hasThreadHidden = isThreadHidden || message.entityType !== 'entry' || !message.thread.length;
    let msgClassName = 'Message';
    if (isEditing) msgClassName += ' Message--editing';

    return (
      <div className={msgClassName} role="listitem">
        <Avatar baseUrl={url} author={authorAvatar} />
        <div className="Message__body">
          <MessageHoverMenu
            message={message}
            isEditing={isEditing}
            handleEditToggle={this.handleEditToggle}
            createFavoriteRequest={createFavoriteRequest}
            deleteMessageRequest={deleteMessageRequest}
            deleteFavoriteRequest={deleteFavoriteRequest}
            deleteReactionRequest={deleteReactionRequest}
            currentUser={currentUser}
            modalOpen={modalOpen}
          />
          <div className="Message__content">
            <div className="Message__meta">
              <Link to={authorUrl} className="Message__author">
                {message.authorName}
              </Link>
              <time className="Message__time">
                {dateUtil(message.createdAt).localTime()}
              </time>
            </div>
            {message.entityType === 'entry' && (
              <MessageContent
                isEditing={isEditing}
                content={message.body}
                updateMessageRequest={updateMessageRequest}
                closeEditor={this.handleEditToggle}
                messageSlug={message.slug}
              />
            )}
            {message.entityType !== 'entry' && (
              <ChannelSub sub={message} />
            )}
          </div>
          <Reactions
            createReactionRequest={createReactionRequest}
            reactions={reactions}
            messageId={message.id}
            users={users}
          />
          {hasThreadHidden || (
            <SingleMessageThread
              matchUrl={url}
              messageSlug={message.slug}
              users={users}
              threadMessages={threadMessages}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Message;
