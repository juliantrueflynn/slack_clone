import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
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
      isDm,
      updateMessageRequest,
      threadMessages,
      createReactionRequest,
      users,
      reactions,
      modalOpen,
      deleteMessageRequest,
      createFavoriteRequest,
      deleteFavoriteRequest,
      deleteReactionRequest,
      isThreadHidden,
      currentUser,
    } = this.props;
    const { isEditing } = this.state;

    if (!message || (message.entityType !== 'entry' && isDm)) {
      return null;
    }

    const avatar = {
      slug: message.authorSlug,
      username: message.authorName,
      avatarThumb: message.avatarThumb,
    };
    const authorUrl = `${url}/team/${message.authorSlug}`;
    const dateCreated = dateUtil(message.createdAt).localTime();
    const entryReactions = reactions.filter(item => item.messageId === message.id);
    const hasReactions = !!entryReactions.length;
    const entryClassNames = classNames('Message', { 'Message--editing': isEditing });

    return (
      <div className={entryClassNames} role="listitem">
        <Avatar baseUrl={url} author={avatar} />
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
                {dateCreated}
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
            {message.entityType === 'entry' || (
              <ChannelSub sub={message} />
            )}
          </div>
          {hasReactions && (
            <Reactions
              createReaction={createReactionRequest}
              reactions={entryReactions}
              userId={currentUser.id}
              messageId={message.id}
            />
          )}
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
