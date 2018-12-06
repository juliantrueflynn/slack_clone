import React, { Fragment } from 'react';
import EmojiPicker from 'emoji-picker-react';
import Menu from './Menu';
import Message from './Message';
import DropdownModal from './DropdownModal';

class MessagesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editMessageSlug: null };
    this.handleEditToggle = this.handleEditToggle.bind(this);
    this.handleEmojiClick = this.handleEmojiClick.bind(this);
  }

  getDdMenuItems() {
    const {
      dropdownType,
      dropdownProps,
      deleteMessageRequest,
      createPinRequest,
      destroyPinRequest,
      currentUserSlug,
    } = this.props;

    if (dropdownType !== 'DROPDOWN_MESSAGE') {
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

  handleEmojiClick(_, emoji) {
    const { dropdownProps: { messageSlug }, toggleReaction, closeDropdown } = this.props;
    toggleReaction({ messageSlug, emoji: emoji.name });
    closeDropdown();
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
      dropdownType,
      dropdownProps,
      toggleReaction,
      ...props
    } = this.props;
    const { editMessageSlug } = this.state;

    return (
      <Fragment>
        {messages && messages.map(message => (
          <Message
            key={message.id}
            message={message}
            isDdOpen={!!dropdownType}
            toggleEditor={this.handleEditToggle}
            editMessageSlug={editMessageSlug}
            toggleReaction={toggleReaction}
            {...props}
          />
        ))}
        {dropdownType === 'DROPDOWN_MESSAGE' && (
          <DropdownModal close={closeDropdown} coordinates={dropdownProps}>
            <Menu items={this.getDdMenuItems()} />
          </DropdownModal>
        )}
        {dropdownType === 'DROPDOWN_REACTION' && (
          <DropdownModal close={closeDropdown} coordinates={dropdownProps}>
            <EmojiPicker onEmojiClick={this.handleEmojiClick} disableDiversityPicker />
          </DropdownModal>
        )}
      </Fragment>
    );
  }
}

export default MessagesList;
