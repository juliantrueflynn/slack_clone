import React from 'react';
import MessageContainer from './MessageContainer';
import ChannelBlurb from './ChannelBlurb';
import './MessagesPane.css';

class MessagesPane extends React.Component {
  constructor(props) {
    super(props);
    this.messagesList = React.createRef();
  }

  componentDidMount() {
    this.scrollToBottom();
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
      chatTitle,
      isThreadHidden,
    } = this.props;

    if (!messages) {
      return null;
    }

    return (
      <div ref={this.messagesList} className="MessagesPane">
        <ChannelBlurb
          chatTitle={chatTitle}
          users={users}
          channel={channel}
          isThreadHidden={isThreadHidden}
        />
        {messages.map(message => (
          <MessageContainer
            key={message.slug}
            author={users[message.authorSlug]}
            message={message}
            users={users}
            isThreadHidden={isThreadHidden}
          />
        ))}
      </div>
    );
  }
}

export default MessagesPane;
