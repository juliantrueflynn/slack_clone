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
import MessagePin from './MessagePin';

const Message = ({
  match: { url },
  message,
  role,
  users,
  reactions,
  pins,
  modalOpen,
  createReactionRequest,
  updateMessageRequest,
  shouldShowPins,
  isThreadHidden,
  currentUser,
  handleEditToggle,
  handleHover,
  hoverMessageId,
  editMessageId,
  ddToggle,
  children,
  ...props
}) => {
  const hasHover = message.id === hoverMessageId;
  const isEditing = message.id === editMessageId;
  const avatar = {
    slug: message.authorSlug,
    username: message.authorName,
    avatarThumb: message.avatarThumb,
  };
  const authorUrl = `${url}/team/${message.authorSlug}`;
  const dateCreated = dateUtil(message.createdAt).localTime();
  const entryReactions = reactions.filter(item => item.messageId === message.id);
  const hasReactions = !!entryReactions.length;
  const hasChildren = !!children;
  const isPinned = !!message.pinId;

  const toggleHover = (int) => {
    if (handleHover) {
      handleHover(int);
    }
  };

  const entryClassNames = classNames('Message', {
    'Message--editing': isEditing,
    'Message--hover': hasHover && !isEditing,
    'Message--pinned': isPinned,
  });

  return (
    <div role={role} className={entryClassNames}>
      <div
        role="presentation"
        className="Message__container"
        onClick={() => toggleHover(message.id)}
        onMouseEnter={() => toggleHover(message.id)}
        onMouseLeave={() => toggleHover(-1)}
      >
        {shouldShowPins && isPinned && (
          <MessagePin pinId={message.pinId} users={users} pins={pins} currUserId={currentUser.id} />
        )}
        {isEditing || (
          <MessageHoverMenu
            ddToggle={ddToggle}
            isEditing={isEditing}
            handleEditToggle={handleEditToggle}
            currentUser={currentUser}
            modalOpen={modalOpen}
            {...message}
            {...props}
          />
        )}
        <div className="Message__row">
          <Avatar baseUrl={url} author={avatar} />
          <div className="Message__body">
            <div className="Message__content">
              <div className="Message__meta">
                <Link to={authorUrl} className="Message__author">
                  {message.authorName}
                </Link>
                <time className="Message__time">{dateCreated}</time>
              </div>
              {message.entityType === 'entry' && (
                <MessageContent
                  isEditing={isEditing}
                  content={message.body}
                  updateMessageRequest={updateMessageRequest}
                  closeEditor={handleEditToggle}
                  messageSlug={message.slug}
                />
              )}
              {message.entityType !== 'entry' && <ChannelSub sub={message} />}
            </div>
            {(hasReactions && !hasChildren) && (
              <Reactions
                createReaction={createReactionRequest}
                reactions={entryReactions}
                currUserId={currentUser.id}
                messageId={message.id}
              />
            )}
            {hasChildren || isThreadHidden || (
              <SingleMessageThread matchUrl={url} users={users} {...message} />
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
