import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './Modal';
import ProfileDropdown from './ProfileDropdown';
import Button from './Button';
import StatusIcon from './StatusIcon';
import Menu from './Menu';
import LeftSidebarMenus from './LeftSidebarMenus';
import './LeftSidebar.css';

class LeftSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDmUnsubClick = this.handleDmUnsubClick.bind(this);
  }

  handleDmUnsubClick(e) {
    e.preventDefault();

    const {
      updateChannelSubRequest,
      chatPath,
      history,
      workspace: { slug, channels },
    } = this.props;
    const dmChannelSlug = e.target.id;
    const isCurrChannel = chatPath === dmChannelSlug;

    updateChannelSubRequest(dmChannelSlug);

    if (isCurrChannel) {
      const defaultChannelSlug = channels[0];
      history.push(`/${slug}/messages/${defaultChannelSlug}`);
    }
  }

  handleHistoryPush(linkUrl) {
    const {
      match: { url },
      drawer: { drawerType, drawerSlug },
      history,
    } = this.props;

    let menuUrl = `${url}/${linkUrl}`;
    if (drawerType && drawerType !== 'details') {
      menuUrl += `/${drawerType}`;

      if (drawerSlug) {
        menuUrl += `/${drawerSlug}`;
      }
    }

    history.push(menuUrl);
  }

  isActiveChannel(match, location) {
    const { chatPath } = this.props;

    return match && location.pathname.includes(`messages/${chatPath}`);
  }

  render() {
    const {
      hasUnreadConvos,
      channelsMap,
      channelSubsMap,
      currentUser,
      users,
      workspace,
      workspaces,
      modalOpen,
      modalClose,
      isModalOpen,
      chatPath,
      match: { url },
    } = this.props;

    const user = users[currentUser.slug];

    if (!user) {
      return null;
    }

    const channels = Object.values(channelsMap);
    const subbedChannels = channels.filter(ch => (
      ch.members.includes(currentUser.slug) && !ch.hasDm
    )).sort((a, b) => (
      a.title && b.title && a.title.localeCompare(b.title)
    ));
    const hasUnreadChannels = channels.some(ch => ch.hasUnreads);
    const dmChannels = user.subs.map(subId => channelSubsMap[subId]).filter(sub => (
      channelsMap[sub.channelSlug].hasDm && sub.inSidebar
    )).map((sub) => {
      const ch = { ...channelsMap[sub.channelSlug] };

      const subsUserSlugs = ch.members.filter(userSlug => userSlug !== user.slug);
      const subUser = subsUserSlugs[0] && users[subsUserSlugs[0]];

      if (subUser) {
        ch.title = subUser.username;
        ch.status = subUser.status;
      }

      return ch;
    });

    const quickLinksList = [
      {
        icon: <FontAwesomeIcon icon="align-left" fixedWidth />,
        label: 'All Unreads',
        onClick: () => this.handleHistoryPush('unreads'),
        isItemActive: chatPath === 'unreads',
        modifierClassName: hasUnreadChannels ? 'unread' : null,
      },
      {
        icon: <FontAwesomeIcon icon={['far', 'comment']} fixedWidth />,
        label: 'All Threads',
        onClick: () => this.handleHistoryPush('threads'),
        isItemActive: chatPath === 'threads',
        modifierClassName: hasUnreadConvos ? 'unread' : null,
      },
    ];

    const channelsItems = subbedChannels.map(ch => ({
      icon: <FontAwesomeIcon icon="hashtag" size="sm" fixedWidth />,
      label: ch.title,
      link: `${url}/messages/${ch.slug}`,
      modifierClassName: ch.hasUnreads ? 'unread' : null,
      isActive: this.isActiveChannel,
    }));

    const dmChatsItems = dmChannels.map(({ status, ...ch }) => ({
      icon: <StatusIcon member={{ status }} />,
      link: `${url}/messages/${ch.slug}`,
      modifierClassName: ch.hasUnreads ? 'unread' : null,
      label: (
        <Fragment>
          {ch.title}
          <Button id={ch.slug} unStyled onClick={this.handleDmUnsubClick}>
            <FontAwesomeIcon icon="times-circle" />
          </Button>
        </Fragment>
      ),
    }));

    const sidebarMenuItems = [
      {
        key: 'profile-dropdown',
        content: (
          <ProfileDropdown
            user={user}
            workspaceTitle={workspace.title}
            workspaces={workspaces}
            chatPath={chatPath}
          />
        ),
      },
      {
        key: 'quicklinks',
        content: <Menu menuFor="quicklinks" items={quickLinksList} />,
      },
      {
        key: 'chats',
        content: <Menu menuFor="chats" items={channelsItems} />,
        title: (
          <Fragment>
            <Button unStyled buttonFor="chats" onClick={() => modalOpen('MODAL_CHATS')}>
              Channels
            </Button>
            <Button unStyled buttonFor="widget" onClick={() => modalOpen('MODAL_CHAT')}>
              <FontAwesomeIcon icon={['fas', 'plus-circle']} />
            </Button>
          </Fragment>
        ),
      },
      {
        key: 'dm-chats',
        content: <Menu menuFor="dm-chats" items={dmChatsItems} />,
        title: 'Direct Messages',
      }
    ];

    return (
      <aside className="LeftSidebar">
        <LeftSidebarMenus menuGroups={sidebarMenuItems} />
        <Modal
          isOpen={isModalOpen}
          modalFor="left-sidebar"
          modalPos="left"
          close={modalClose}
          unStyled
          lightOverlay
        >
          <LeftSidebarMenus menuGroups={sidebarMenuItems} />
        </Modal>
      </aside>
    );
  }
}

export default LeftSidebar;
