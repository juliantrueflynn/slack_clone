import React from 'react';
import MessageContainer from './MessageContainer';
import './MessagesPane.css';

class MessagesPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMouseOver: -1 };
    this.messagesList = React.createRef();
    this.handleHoverToggle = this.handleHoverToggle.bind(this);
    this.handleContainerHover = this.handleContainerHover.bind(this);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleHoverToggle(isMouseOver) {
    this.setState({ isMouseOver });
  }

  handleContainerHover() {
    const { isReactionModalOpen } = this.state;
    if (!isReactionModalOpen) this.setState({ isMouseOver: -1 });
  }

  scrollToBottom() {
    const listNode = this.messagesList.current;
    const { scrollHeight, clientHeight } = listNode;
    const maxScrollTop = scrollHeight - clientHeight;
    listNode.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    const {
      channel,
      users,
      messages,
      isReactionModalOpen,
    } = this.props;
    const { isMouseOver } = this.state;

    if (!channel) return null;

    return (
      <div
        className="MessagesPane"
        onMouseLeave={this.handleContainerHover}
      >
        <div role="list" ref={this.messagesList} className="MessagesPane__list">
          {messages.map(message => (
            <MessageContainer
              key={message.slug}
              author={users[message.authorSlug]}
              message={message}
              handleHoverToggle={this.handleHoverToggle}
              isMouseOver={isMouseOver}
              isReactionOpen={isReactionModalOpen}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default MessagesPane;
