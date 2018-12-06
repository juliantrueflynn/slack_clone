import React, { Fragment } from 'react';
import Message from './Message';
import DropdownModal from './DropdownModal';

class MessagesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editMessageSlug: null };
    this.handleEditToggle = this.handleEditToggle.bind(this);
  }

  getDdMenuItems() {
    const {
      isDdOpen,
      dropdownProps,
      deleteMessageRequest,
      createPinRequest,
      destroyPinRequest,
      currentUserSlug,
    } = this.props;

    if (!isDdOpen || !dropdownProps.message) {
      return [];
    }

    const { message } = dropdownProps;

    return [
      {
        label: 'Un-pin message',
        onClick: () => destroyPinRequest(message.pinId),
        condition: !!message.pinId,
      },
      {
        label: 'Pin message',
        onClick: () => createPinRequest({ messageId: message.id }),
        condition: !message.pinId,
      },
      {
        label: 'Edit message',
        onClick: () => this.handleEditToggle(message.slug),
        condition: message.authorSlug === currentUserSlug,
      },
      {
        label: 'Delete message',
        onClick: () => deleteMessageRequest(message.slug),
        condition: message.authorSlug === currentUserSlug,
      }
    ];
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
      isEditable,
      closeDropdown,
      deleteMessageRequest,
      createPinRequest,
      destroyPinRequest,
      toggleMessageEditor,
      isDdOpen,
      dropdownProps,
      ...props
    } = this.props;
    const { editMessageSlug } = this.state;

    return (
      <Fragment>
        {messages && messages.map(message => (
          <Message
            key={message.id}
            message={message}
            isDdOpen={isDdOpen}
            toggleEditor={this.handleEditToggle}
            editMessageSlug={editMessageSlug}
            {...props}
          />
        ))}
        {isDdOpen && (
          <DropdownModal
            items={this.getDdMenuItems()}
            close={closeDropdown}
            dropdownProps={dropdownProps}
          />
        )}
      </Fragment>
    );
  }
}

export default MessagesList;
