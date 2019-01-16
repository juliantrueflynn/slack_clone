import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import MessageHoverMenu from '../MessageHoverMenu';
import MessageReactions from '../MessageReactions';
import Avatar from '../Avatar';
import MessageContent from '../MessageContent';
import MessageThreadPreview from '../MessageThreadPreview';
import MessageSubscriberText from '../MessageSubscriberText';
import MessageHighlight from '../MessageHighlight';
import './styles.css';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasHover: false };
    this.handleHover = this.handleHover.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { isHoverable, isDdOpen } = this.props;
    const { hasHover } = this.state;

    if (isHoverable && hasHover && !isDdOpen && prevProps.isDdOpen) {
      this.handleHover(false);
    }
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
      usersMap,
      reactionsMap,
      pinsMap,
      currentUserSlug,
      chatroomTitle,
      chatPathUrl,
      toggleReaction,
      toggleEditor,
      toggleMessageEditor,
      updateMessageRequest,
      isThreadHidden,
      isHighlightable,
      isReactionDdOpen,
      shouldHideEngagement,
      ...props
    } = this.props;
    const { hasHover } = this.state;
    const { isEditing, pinId, favoriteId } = message;
    const authorUrl = `${chatPathUrl}/team/${message.authorSlug}`;

    const msgClassNames = classNames('Message', {
      'Message--editing': message.isEditing,
      'Message--highlighted': isHighlightable && (favoriteId || pinId),
      'Message--hover': hasHover && !isReactionDdOpen && !isEditing && !pinId,
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
          {isHighlightable && (!!pinId || !!favoriteId) && (
            <MessageHighlight
              pinId={pinId}
              pinsMap={pinsMap}
              isFavorited={favoriteId}
              usersMap={usersMap}
              chatPathUrl={chatPathUrl}
              currentUserSlug={currentUserSlug}
            />
          )}
          <MessageHoverMenu
            toggleReaction={toggleReaction}
            chatPathUrl={chatPathUrl}
            message={message}
            currentUserSlug={currentUserSlug}
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
                    isEditing={isEditing}
                    content={message.body}
                    updateMessageRequest={updateMessageRequest}
                    closeEditor={toggleMessageEditor}
                    slug={message.slug}
                  />
                )}
                {message.entityType !== 'entry' && message.group && (
                  <MessageSubscriberText sub={message} chatroomTitle={chatroomTitle} />
                )}
              </div>
              {shouldHideEngagement || (
                <Fragment>
                  <MessageReactions
                    toggleReaction={toggleReaction}
                    reactionIds={message.reactionIds}
                    reactionsMap={reactionsMap}
                    currentUserSlug={currentUserSlug}
                    messageSlug={message.slug}
                  />
                  <MessageThreadPreview
                    isThreadHidden={isThreadHidden}
                    chatPathUrl={chatPathUrl}
                    usersMap={usersMap}
                    thread={message.thread}
                    lastMessageDate={message.lastMessageDate}
                    authors={message.authors}
                    slug={message.slug}
                  />
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
