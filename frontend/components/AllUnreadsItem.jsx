import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MessageContainer from './MessageContainer';
import './AllUnreadsItem.css';
import Button from './Button';

class AllUnreadsItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClearUnreadsClick = this.handleClearUnreadsClick.bind(this);
  }

  handleClearUnreadsClick() {
    const { clearUnreads, channel } = this.props;
    clearUnreads(channel.slug);
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
    }, []).filter(message => message.isUnread);

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
              author={authors[message.authorSlug]}
              message={message}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default AllUnreadsItem;
