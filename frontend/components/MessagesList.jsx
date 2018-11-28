import React from 'react';
import Message from './Message';

class MessagesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editMessageSlug: null };
    this.handleEditToggle = this.handleEditToggle.bind(this);
  }

  handleEditToggle(messageSlug) {
    const { isEditable, toggleMessageEditor } = this.props;
    const { editMessageSlug } = this.state;

    if (!isEditable) {
      return;
    }

    if (editMessageSlug !== messageSlug) {
      this.setState({ editMessageSlug: messageSlug });

      if (editMessageSlug) {
        toggleMessageEditor(editMessageSlug);
      }
    } else {
      this.setState({ editMessageSlug: null });
    }

    toggleMessageEditor(messageSlug);
  }

  render() {
    const {
      messages,
      history,
      location,
      toggleEditor,
      isEditable,
      ...props
    } = this.props;
    const { editMessageSlug } = this.state;

    return messages && messages.map(message => (
      <Message
        key={message.id}
        message={message}
        editMessageSlug={editMessageSlug}
        toggleEditor={this.handleEditToggle}
        {...props}
      />
    ));
  }
}

export default MessagesList;
