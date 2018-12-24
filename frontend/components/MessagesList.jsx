import React, { Fragment } from 'react';
import EmojiPicker from 'emoji-picker-react';
import Menu from './Menu';
import Message from './Message';
import DropdownModal from './DropdownModal';

class MessagesList extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmojiClick = this.handleEmojiClick.bind(this);
  }

  getDdMenuItems() {
    const {
      dropdownType,
      dropdownProps,
      deleteMessageRequest,
      createPinRequest,
      destroyPinRequest,
      toggleMessageEditor,
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
        onClick: () => toggleMessageEditor(message.slug),
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
    const { dropdownProps: { message }, toggleReaction, closeDropdown } = this.props;
    toggleReaction({ messageSlug: message.slug, emoji: emoji.name });
    closeDropdown();
  }

  render() {
    const {
      messages,
      history,
      location,
      closeDropdown,
      deleteMessageRequest,
      createPinRequest,
      destroyPinRequest,
      dropdownType,
      dropdownProps,
      toggleReaction,
      ...props
    } = this.props;

    return (
      <Fragment>
        {messages && messages.map(message => (
          <Message
            key={message.slug}
            message={message}
            isDdOpen={!!dropdownType}
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
