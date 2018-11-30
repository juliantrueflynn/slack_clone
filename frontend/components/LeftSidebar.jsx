import React from 'react';
import Modal from './Modal';
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

  render() {
    const {
      channelsMap,
      channelSubsMap,
      currentUser,
      users,
      workspace,
      modalClose,
      isModalOpen,
      drawer,
      history,
      updateChannelSubRequest,
      ...props
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

    const Menus = (
      <LeftSidebarMenus
        user={user}
        hasUnreadChannels={hasUnreadChannels}
        dmChannels={dmChannels}
        subbedChannels={subbedChannels}
        workspaceTitle={workspace.title}
        pushHistory={this.handleHistoryPush}
        unsubChannel={this.handleDmUnsubClick}
        {...props}
      />
    );

    return (
      <aside className="LeftSidebar">
        {Menus}
        <Modal
          isOpen={isModalOpen}
          modalFor="left-sidebar"
          modalPos="left"
          close={modalClose}
          unStyled
          lightOverlay
        >
          {Menus}
        </Modal>
      </aside>
    );
  }
}

export default LeftSidebar;
