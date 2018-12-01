import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { itemDecorate } from '../util/menuUtil';
import Modal from './Modal';
import Menu from './Menu';
import UserPreview from './UserPreview';
import StatusIcon from './StatusIcon';
import Dropdown from './Dropdown';
import Button from './Button';
import LeftSidebarMenus from './LeftSidebarMenus';
import './LeftSidebar.css';

class LeftSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDmUnsubClick = this.handleDmUnsubClick.bind(this);
    this.handleHistoryPush = this.handleHistoryPush.bind(this);
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
      isModalOpen,
      modalClose,
    } = this.props;

    let menuUrl = `${url}/${linkUrl}`;
    if (drawerType && drawerType !== 'details') {
      menuUrl += `/${drawerType}`;

      if (drawerSlug) {
        menuUrl += `/${drawerSlug}`;
      }
    }

    if (isModalOpen) {
      modalClose();
    }

    history.push(menuUrl);
  }

  render() {
    const {
      channelsMap,
      channelSubsMap,
      hasUnreadConvos,
      currentUser,
      users,
      workspace,
      modalClose,
      isModalOpen,
      workspaces,
      chatPath,
      modalOpen,
      match: { url },
    } = this.props;

    const user = users[currentUser.slug];

    if (!user) {
      return null;
    }

    const channels = Object.values(channelsMap);
    const subbedChannels = channels.filter(ch => ch.isSub && !ch.hasDm).sort((a, b) => (
      a.title.localeCompare(b.title)
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

    const ddDefaults = [
      { label: <UserPreview user={user} avatarSize="40" hasNoStatus alignCenter /> },
      {
        label: 'Home',
        link: '/',
        exact: true,
        hasNoDrawer: true,
      },
      { label: 'Profile & Account', link: `${url}/team/${user.slug}`, hasNoDrawer: true },
      { key: 'switch-workspace', label: 'Switch Workspace' },
    ];

    const userItems = ddDefaults.concat(workspaces.map(item => itemDecorate(item, {
      hasNoDrawer: true,
    })));

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

    const channelsItems = subbedChannels.map(ch => itemDecorate(ch, {
      icon: <FontAwesomeIcon icon="hashtag" size="sm" fixedWidth />,
      urlPrefix: `${url}/messages/`,
      modifierClassName: ch.hasUnreads ? 'unread' : null,
      isActive: (match, location) => (
        match && location.pathname.includes(`messages/${chatPath}`)
      ),
    }));

    const dmChannelsItems = dmChannels.map(({ status, ...ch }) => itemDecorate(ch, {
      icon: <StatusIcon member={{ status }} />,
      urlPrefix: `${url}/messages/`,
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
        key: 'profile',
        component: Dropdown,
        items: userItems,
        props: {
          togglerText: (
            <Fragment>
              <div className="LeftSidebar__workspace">{workspace.title}</div>
              <div className="LeftSidebar__workspace-subhead">
                <StatusIcon member={user} size="sm" />
                <div className="LeftSidebar__username">{user.username}</div>
              </div>
            </Fragment>
          ),
        },
      },
      { key: 'quicklinks', component: Menu, items: quickLinksList },
      {
        key: 'chats',
        component: Menu,
        items: channelsItems,
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
        component: Menu,
        items: dmChannelsItems,
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
          hasDarkOverlay
          unStyled
        >
          <LeftSidebarMenus menuGroups={sidebarMenuItems} />
        </Modal>
      </aside>
    );
  }
}

export default LeftSidebar;
