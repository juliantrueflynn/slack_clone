import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
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

    if (isHoverable && !isDdOpen) {
      this.setState({ hasHover });
    }
  }

  render() {
    const {
      message,
      role,
      users,
      reactionsMap,
      pinsMap,
      currentUserSlug,
      chatPathUrl,
      toggleReaction,
      toggleEditor,
      toggleMessageEditor,
      updateMessageRequest,
      isThreadHidden,
      isHoverable,
      isHighlightable,
      shouldHideEngagement,
      ...props
    } = this.props;
    const { hasHover } = this.state;
    const authorUrl = `${chatPathUrl}/team/${message.authorSlug}`;
    const hasReactions = !!(reactionsMap && message.reactionIds && message.reactionIds.length);

    const msgClassNames = classNames('Message', {
      'Message--hoverable': isHoverable,
      'Message--editing': message.isEditing,
      'Message--highlighted': isHighlightable && (message.favoriteId || message.pinId),
      'Message--hover': hasHover && !message.isEditing && !message.pinId,
    });

    return (
      <div role={role} className={msgClassNames}>
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
              chatPathUrl={chatPathUrl}
              currentUserSlug={currentUserSlug}
            />
          )}
          <MessageHoverMenu
            hasHover={hasHover}
            handleHover={this.handleHover}
            toggleDd={this.handleDdToggle}
            chatPathUrl={chatPathUrl}
            message={message}
            {...props}
          />
          <div className="Message__row">
            <Avatar baseUrl={chatPathUrl} user={message} />
            <div className="Message__body">
              <div className="Message__content">
                <div className="Message__meta">
                  <Link to={authorUrl} className="Message__author">{message.username}</Link>
                  <time className="Message__time">{message.dateCreated}</time>
                </div>
                {message.entityType === 'entry' && (
                  <MessageContent
                    isEditing={message.isEditing}
                    content={message.body}
                    updateMessageRequest={updateMessageRequest}
                    closeEditor={() => toggleMessageEditor(null)}
                    slug={message.slug}
                  />
                )}
                {message.entityType !== 'entry' && <ChannelSub sub={message} />}
              </div>
              {hasReactions && !shouldHideEngagement && (
                <Reactions
                  toggleReaction={toggleReaction}
                  reactionIds={message.reactionIds}
                  reactionsMap={reactionsMap}
                  currentUserSlug={currentUserSlug}
                  messageSlug={message.slug}
                />
              )}
              {isThreadHidden || shouldHideEngagement || (
                <SingleMessageThread chatPathUrl={chatPathUrl} users={users} {...message} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
