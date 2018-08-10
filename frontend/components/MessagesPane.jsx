import React from 'react';
import ChannelBlurb from './ChannelBlurb';
import MessageContainer from './Message/MessageContainer';
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
      chatTitle,
      hasMessages,
      channel,
      users,
      messages,
    } = this.props;

    return (
      <div className="MessagesPane">
        <div role="list" ref={this.messagesList} className="MessagesPane__list">
          <ChannelBlurb
            title={chatTitle}
            owner={users[channel.ownerSlug]}
            hasMessages={hasMessages}
            createdAt={channel.createdAt}
          />
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
