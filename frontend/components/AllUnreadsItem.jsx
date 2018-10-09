import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MessageContainer from './MessageContainer';
import './AllUnreadsItem.css';
import Button from './Button';
import { isDateOlderThanOther } from '../util/dateUtil';

class AllUnreadsItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClearUnreadsClick = this.handleClearUnreadsClick.bind(this);
  }

  handleClearUnreadsClick() {
    const { clearUnreads, channel, messages } = this.props;
    const messageSlug = channel.messages[channel.messages.length - 1];
    const lastMessage = messages[messageSlug];
    clearUnreads(channel.slug, lastMessage.createdAt);
  }

  render() {
    const {
      channel,
      messages,
      authors,
    } = this.props;

    const unreadMessages = channel.messages.reduce((acc, curr) => {
      acc.push(messages[curr]);
      return acc;
    }, []).filter(message => (
      isDateOlderThanOther(channel.lastRead, message.createdAt) && message.entityType === 'entry'
    ));

    const messagesLengthText = `${unreadMessages.length} messages`;

    return (
      <div className="AllUnreadsItem">
        <header className="AllUnreadsItem__header">
          <FontAwesomeIcon className="AllUnreadsItem__title-hashtag" icon="hashtag" size="sm" />
          <h3 className="AllUnreadsItem__title">
            {channel.title}
          </h3>
          <div className="AllUnreadsItem__meta">
            <div className="AllUnreadsItem__length">
              {messagesLengthText}
            </div>
            <Button buttonFor="unread" size="sm" onClick={this.handleClearUnreadsClick}>
              Mark as Read
            </Button>
          </div>
        </header>
        <div className="AllUnreadsItem__body">
          {unreadMessages.map(message => (
            <MessageContainer
              key={message.id}
              users={authors}
              message={message}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default AllUnreadsItem;
