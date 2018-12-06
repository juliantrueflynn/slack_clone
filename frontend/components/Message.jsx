import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { dateUtil } from '../util/dateUtil';
import MessageHoverMenu from './MessageHoverMenu';
import Reactions from './Reactions';
import Avatar from './Avatar';
import MessageContent from './MessageContent';
import SingleMessageThread from './SingleMessageThread';
import ChannelSub from './ChannelSub';
import MessageHighlight from './MessageHighlight';
import './Message.css';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasHover: false };
    this.handleHover = this.handleHover.bind(this);
  }

  handleHover(hasHover) {
    const { isHoverable, isDdOpen } = this.props;

    if (isDdOpen) {
      return;
    }

    if (isHoverable) {
      this.setState({ hasHover });
    }
  }

  render() {
    const {
      message,
      role,
      users,
      pinsMap,
      reactions,
      currentUserSlug,
      url,
      messageDate,
      toggleReaction,
      toggleEditor,
      editMessageSlug,
      toggleMessageEditor,
      updateMessageRequest,
      isDdOpen,
      isThreadHidden,
      isHoverable,
      isHighlightable,
      shouldHideAvatar,
      shouldHideEngagement,
      ...props
    } = this.props;
    const { hasHover } = this.state;

    const date = dateUtil(message.createdAt);
    const time = date.localTime();
    let dateCreated = messageDate;
    if (!messageDate) {
      if (date.isToday()) {
        dateCreated = date.localTime();
      } else {
        const month = date.monthName({ month: 'short' });
        const day = date.dayOrdinal();
        dateCreated = `${month} ${day}, ${time}`;
      }
    }

    const isEditing = editMessageSlug === message.slug;
    const authorUrl = `${url}/team/${message.authorSlug}`;

    const entryClassNames = classNames('Message', {
      'Message--hoverable': isHoverable,
      'Message--editing': isEditing,
      'Message--highlighted': isHighlightable && (message.favoriteId || message.pinId),
      'Message--hover': hasHover && !isEditing && !message.pinId,
    });

    return (
      <div role={role} className={entryClassNames}>
        <div
          role="presentation"
          className="Message__container"
          onFocus={() => null}
          onMouseLeave={() => this.handleHover(false)}
          onMouseOver={() => !hasHover && this.handleHover(true)}
        >
          {isHighlightable && (!!message.pinId || !!message.favoriteId) && (
            <MessageHighlight
              pinId={message.pinId}
              pinsMap={pinsMap}
              isFavorited={message.favoriteId}
              users={users}
              matchUrl={url}
              currentUserSlug={currentUserSlug}
            />
          )}
          <MessageHoverMenu
            hasHover={hasHover}
            isDdOpen={isDdOpen}
            handleHover={this.handleHover}
            toggleDd={this.handleDdToggle}
            matchUrl={url}
            message={message}
            {...props}
          />
          <div className="Message__row">
            {shouldHideAvatar || <Avatar baseUrl={url} user={message} />}
            <div className="Message__body">
              <div className="Message__content">
                <div className="Message__meta">
                  <Link to={authorUrl} className="Message__author">{message.username}</Link>
                  <time className="Message__time">{dateCreated}</time>
                </div>
                {message.entityType === 'entry' && (
                  <MessageContent
                    isEditing={isEditing}
                    content={message.body}
                    updateMessageRequest={updateMessageRequest}
                    closeEditor={toggleMessageEditor}
                    slug={message.slug}
                  />
                )}
                {message.entityType !== 'entry' && <ChannelSub sub={message} />}
              </div>
              {shouldHideEngagement || (
                <Reactions
                  toggleReaction={toggleReaction}
                  reactions={message.reactions}
                  currentUserSlug={currentUserSlug}
                  messageSlug={message.slug}
                />
              )}
              {isThreadHidden || shouldHideEngagement || (
                <SingleMessageThread
                  thread={message.thread}
                  convoUrl={`${url}/convo/${message.slug}`}
                  users={users}
                  authors={message.authors}
                  lastMessageDate={message.lastMessageDate}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
