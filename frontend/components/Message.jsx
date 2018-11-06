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
  createReactionRequest,
  updateMessageRequest,
  messageDate,
  shouldShowPins,
  isThreadHidden,
  currentUser,
  handleEditToggle,
  handleHover,
  hoverMessageId,
  editMessageId,
  shouldHideAvatar,
  shouldHideEngagement,
  children,
  ...props
}) => {
  if (!message) {
    return null;
  }

  const date = dateUtil(message.createdAt);
  const time = date.localTime();
  let dateCreated = messageDate;
  if (!messageDate) {
    if (date.isToday()) {
      dateCreated = date.localTime();
    } else {
      const month = date.monthName();
      const day = date.dayOrdinal();
      dateCreated = `${month} ${day}, ${time}`;
    }
  }

  const hasHover = message.id === hoverMessageId;
  const isEditing = message.id === editMessageId;
  const avatar = {
    slug: message.authorSlug,
    username: message.authorName,
    avatarThumb: message.avatarThumb,
  };
  const authorUrl = `${url}/team/${message.authorSlug}`;
  const entryReactions = reactions.filter(item => item.messageId === message.id);
  const hasReactions = !!entryReactions.length;
  const isPinned = !!message.pinId;

  const toggleHover = hoverId => handleHover && handleHover(hoverId);
  const isHoverOver = () => handleHover && !hasHover && handleHover(message.id);

  const entryClassNames = classNames('Message', {
    'Message--editing': isEditing,
    'Message--hover': hasHover && !isEditing,
    'Message--pinned': isPinned,
    'Message--has-avatar': !shouldHideAvatar,
  });

  return (
    <div role={role} className={entryClassNames}>
      <div
        role="presentation"
        className="Message__container"
        onFocus={() => null}
        onMouseOver={() => isHoverOver(message.id)}
        onMouseEnter={() => toggleHover(message.id)}
        onMouseLeave={() => toggleHover(-1)}
      >
        {shouldShowPins && isPinned && (
          <MessagePin pinId={message.pinId} users={users} pins={pins} currUserId={currentUser.id} />
        )}
        {isEditing || (
          <MessageHoverMenu
            isEditing={isEditing}
            handleEditToggle={handleEditToggle}
            currentUser={currentUser}
            {...message}
            {...props}
          />
        )}
        <div className="Message__row">
          {shouldHideAvatar || <Avatar baseUrl={url} author={avatar} />}
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
            {(hasReactions && !shouldHideEngagement) && (
              <Reactions
                createReaction={createReactionRequest}
                reactions={entryReactions}
                currUserId={currentUser.id}
                messageId={message.id}
              />
            )}
            {isThreadHidden || shouldHideEngagement || (
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
