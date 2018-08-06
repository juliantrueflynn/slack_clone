import React from 'react';
import { Link } from 'react-router-dom';
import MessageHoverMenuContainer from '../MessageHoverMenuContainer';
import Reactions from '../Reactions';
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
    const authorUrl = author && `${props.match.url}/team/${author.slug}`;

    if (!message) {
      return null;
    }

    return (
      <div
        className={`Message ${isEditing ? 'Message--editing' : ''} ${isMouseOver && !isEditing ? 'Message--hover' : ''}`}
        onMouseEnter={this.handleHoverToggle(true)}
        onMouseLeave={this.handleHoverToggle(false)}
      >
        <Avatar baseUrl={props.match.url} author={author} />
        <div className="Message__body">
          <MessageHoverMenuContainer
            isMouseOver={isMouseOver}
            isEditing={isEditing}
            message={message}
            handleEditToggle={this.handleEditToggle}
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
              updateMessageRequest={props.updateMessageRequest}
              closeEditor={this.handleEditToggle}
              messageSlug={message.slug}
            />
          </div>
          {(!props.isSingleMessage || message.parentMessageId) && (
            <div className="Message__footer">
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
