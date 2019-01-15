import React from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import StatusIcon from './StatusIcon';
import Button from './Button';
import ChannelHeaderNavbar from './ChannelHeaderNavbar';
import './ChannelHeader.css';

class ChannelHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleChannelEditModal = this.handleChannelEditModal.bind(this);
    this.handleAccordionOpen = this.handleAccordionOpen.bind(this);
  }

  handleChannelEditModal() {
    const { openModal, chatroom, currentUserSlug } = this.props;
    openModal('MODAL_FORM_CHATROOM', { chatroom, currentUserSlug });
  }

  handleAccordionOpen(e) {
    const { accordionOpen } = this.props;
    const accordionType = e.target.getAttribute('data-accordion');
    accordionOpen(accordionType);
  }

  render() {
    const {
      chatroom,
      chatTitle,
      isNotDefaultChannel,
      destroySearchQuery,
      messages,
      channelUnreadsLen,
      convoUnreadsLen,
      dmChannelUser,
      users,
      searchQuery,
      openModal,
      chatPath,
      closeDropdown,
      dropdownProps,
      drawerType,
      closeDrawer,
      isDdOpen,
      openChannelDropdown,
      createChatroomSubRequest,
      destroyChatroomSubRequest,
      openProfileModal,
      openSearchModal,
      history,
      match,
    } = this.props;
    const { url } = match;
    const openLeftSidebarModal = () => openModal('MODAL_LEFT_SIDEBAR');

    let metaMenuItems = [];

    if (chatPath === 'unreads') {
      const label = channelUnreadsLen ? `${channelUnreadsLen} unreads` : 'No new messages';
      metaMenuItems = [{ key: 'unreads', label }];
    } else if (chatPath === 'threads') {
      const label = convoUnreadsLen ? `${convoUnreadsLen} updated convos` : 'No new replies';
      metaMenuItems = [{ key: 'unreads', label }];
    } else if (chatroom && chatroom.hasDm) {
      const { email, status } = dmChannelUser;

      metaMenuItems = [
        { key: 'status', icon: <StatusIcon member={dmChannelUser} />, label: status },
        { key: 'email', label: email },
      ];
    } else if (chatroom && !chatroom.hasDm) {
      metaMenuItems = [
        {
          key: 'details',
          icon: <FontAwesomeIcon icon={faUser} size="sm" />,
          link: `${url}/details`,
          label: chatroom.members.length,
          onClick: this.handleAccordionOpen,
          'data-accordion': 'members',
        },
        {
          key: 'pinned',
          icon: <FontAwesomeIcon icon="thumbtack" size="sm" />,
          link: `${url}/details`,
          label: chatroom.pins && chatroom.pins.length,
          onClick: this.handleAccordionOpen,
          'data-accordion': 'pinned',
          condition: chatroom.pins && chatroom.pins.length,
        },
        {
          key: 'topic',
          icon: chatroom.topic && <FontAwesomeIcon icon="edit" size="sm" />,
          label: chatroom.topic || 'Add topic',
          onClick: this.handleChannelEditModal,
        }
      ];
    }

    return (
      <header className="ChannelHeader">
        <Button buttonFor="left-sidebar-mobile" unStyled onClick={openLeftSidebarModal}>
          <FontAwesomeIcon icon="bars" size="lg" />
        </Button>
        <div className="ChannelHeader__info">
          <h1 className="ChannelHeader__title">{chatTitle}</h1>
          <Menu menuFor="header-meta" items={metaMenuItems} isRow unStyled />
        </div>
        <ChannelHeaderNavbar
          chatTitle={chatTitle}
          isNotDefaultChannel={isNotDefaultChannel}
          openModal={openModal}
          isDdOpen={isDdOpen}
          dropdownProps={dropdownProps}
          openChannelDropdown={openChannelDropdown}
          closeDropdown={closeDropdown}
          dmChannelUser={dmChannelUser}
          openChannelEditModal={this.handleChannelEditModal}
          chatroom={chatroom}
          messages={messages}
          users={users}
          drawerType={drawerType}
          closeDrawer={closeDrawer}
          searchQuery={searchQuery}
          destroySearchQuery={destroySearchQuery}
          createChatroomSubRequest={createChatroomSubRequest}
          destroyChatroomSubRequest={destroyChatroomSubRequest}
          openSearchModal={openSearchModal}
          openProfileModal={openProfileModal}
          history={history}
          match={match}
        />
      </header>
    );
  }
}

export default ChannelHeader;
