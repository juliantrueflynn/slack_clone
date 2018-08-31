import React from 'react';
import EmojiModalContainer from './EmojiModalContainer';
import MessageContainer from './MessageContainer';
import ChannelBlurb from './ChannelBlurb';
import './MessagesPane.css';

class MessagesPane extends React.Component {
  constructor(props) {
    super(props);
    this.messagesList = React.createRef();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const listNode = this.messagesList.current;
    const { scrollHeight, clientHeight } = listNode;
    const maxScrollTop = scrollHeight - clientHeight;
    listNode.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    const {
      users,
      messages,
      channel,
      isInSidebar,
    } = this.props;

    if (!messages) return null;

    return (
      <div className="MessagesPane">
        <EmojiModalContainer />
        <div role="list" ref={this.messagesList} className="MessagesPane__list">
          {isInSidebar || (
            <ChannelBlurb
              title={channel.title}
              owner={users[channel.ownerSlug]}
              createdAt={channel.createdAt}
            />
          )}
          {messages.map(message => (
            <MessageContainer
              key={message.slug}
              author={users[message.authorSlug]}
              message={message}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default MessagesPane;
