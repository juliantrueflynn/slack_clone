import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import StatusIcon from './StatusIcon';
import Button from './Button';
import ChannelHeaderNavbar from './ChannelHeaderNavbar';
import './ChannelHeader.css';

class ChannelHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleDdCloseClick = this.handleDdCloseClick.bind(this);
  }

  getPageTitle() {
    const { channel, chatPath } = this.props;

    let title;
    if (chatPath === 'unreads') {
      title = 'All Unreads';
    } else if (chatPath === 'threads') {
      title = 'All Threads';
    } else if (channel) {
      title = channel.hasDm ? channel.title : `#${channel.title}`;
    }

    return title;
  }

  handleDdCloseClick(onClickCallback) {
    const { isDdOpen, closeDropdown } = this.props;

    onClickCallback();

    if (isDdOpen) {
      closeDropdown();
    }
  }

  render() {
    const {
      channel,
      currentUserSlug,
      messages,
      channelUnreadsLen,
      convoUnreadsLen,
      users,
      accordionOpen,
      openModal,
      chatPath,
      closeDropdown,
      match: { url },
      ...props
    } = this.props;

    const openChannelEditModal = () => openModal(
      'MODAL_FORM_CHANNEL',
      { channel, currentUserSlug }
    );
    const { dmUserSlug } = channel || {};

    let metaMenuItems = [];

    if (chatPath === 'unreads') {
      const label = channelUnreadsLen ? `${channelUnreadsLen} unreads` : 'No new messages';
      metaMenuItems = [{ key: 'unreads', label }];
    } else if (chatPath === 'threads') {
      const label = convoUnreadsLen ? `${convoUnreadsLen} updated convos` : 'No new replies';
      metaMenuItems = [{ key: 'unreads', label }];
    } else if (channel && channel.hasDm) {
      const user = users[dmUserSlug];
      const userStatus = user && user.status;
      const email = user && user.email;

      metaMenuItems = [
        { key: 'status', icon: <StatusIcon member={user} />, label: userStatus },
        { key: 'email', label: email },
      ];
    } else if (channel && !channel.hasDm) {
      metaMenuItems = [
        {
          key: 'details',
          icon: <FontAwesomeIcon icon="user" size="sm" />,
          link: `${url}/details`,
          label: channel.members.length,
          onClick: () => accordionOpen('members'),
        },
        {
          key: 'pinned',
          icon: <FontAwesomeIcon icon="thumbtack" size="sm" />,
          link: `${url}/details`,
          label: channel.pins && channel.pins.length,
          onClick: () => accordionOpen('pinned'),
          condition: channel.pins && channel.pins.length,
        },
        {
          key: 'topic',
          icon: !!channel.topic || <FontAwesomeIcon icon="edit" size="sm" />,
          label: channel.topic || 'Add topic',
          onClick: openChannelEditModal,
        }
      ];
    }

    return (
      <header className="ChannelHeader">
        <Button buttonFor="left-sidebar-mobile" unStyled onClick={() => openModal('MODAL_LEFT_SIDEBAR')}>
          <FontAwesomeIcon icon="bars" size="lg" />
        </Button>
        <div className="ChannelHeader__info">
          <h1 className="ChannelHeader__title">{this.getPageTitle()}</h1>
          <Menu menuFor="header-meta" items={metaMenuItems} isRow unStyled />
        </div>
        <ChannelHeaderNavbar
          chatTitle={this.getPageTitle()}
          openModal={openModal}
          closeDropdown={this.handleDdCloseClick}
          openChannelEditModal={openChannelEditModal}
          channel={channel}
          messages={messages}
          users={users}
          {...props}
        />
      </header>
    );
  }
}

export default ChannelHeader;
