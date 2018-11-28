import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import DmChatMenuItem from './DmChatMenuItem';
import ProfileDropdown from './ProfileDropdown';
import StatusIcon from './StatusIcon';
import SidebarMenu from './SidebarMenu';
import './LeftSidebar.css';

const LeftSidebar = ({
  hasUnreadConvos,
  channels,
  currentUser,
  currWorkspace,
  workspaces,
  modalOpen,
  dmChats,
  updateChannelSubRequest,
  currChatSlug,
  drawer: { drawerType, drawerSlug },
  match: { url },
  history,
}) => {
  if (!currWorkspace) {
    return null;
  }

  const hasUnreadChannels = !!channels.filter(ch => ch.isSub && ch.hasUnreads).length;
  const subbedChannels = channels.filter(ch => ch.isSub).sort((a, b) => (
    a.title && b.title && a.title.localeCompare(b.title)
  ));

  const handleHistoryPush = (linkUrl) => {
    let menuUrl = `${url}/${linkUrl}`;
    if (drawerType && drawerType !== 'details') {
      menuUrl += `/${drawerType}`;

      if (drawerSlug) {
        menuUrl += `/${drawerSlug}`;
      }
    }

    history.push(menuUrl);
  };

  const quickLinksList = [
    {
      icon: <FontAwesomeIcon className="Icon" icon={['fas', 'align-left']} />,
      label: 'All Unreads',
      onClick: () => handleHistoryPush('unreads'),
      isItemActive: currChatSlug === 'unreads',
      modifierClassName: hasUnreadChannels ? 'unread' : null,
    },
    {
      icon: <FontAwesomeIcon className="Icon" icon={['far', 'comment']} />,
      label: 'All Threads',
      onClick: () => handleHistoryPush('threads'),
      isItemActive: currChatSlug === 'threads',
      modifierClassName: hasUnreadConvos ? 'unread' : null,
    },
  ];

  const isActiveChannel = (match, location) => (
    match && location.pathname.includes(`messages/${currChatSlug}`)
  );

  const channelsItems = subbedChannels.map(item => ({
    icon: <FontAwesomeIcon className="Icon" icon={['fas', 'hashtag']} size="sm" />,
    label: item.title,
    link: `${url}/messages/${item.slug}`,
    modifierClassName: item.hasUnreads ? 'unread' : null,
    isActive: isActiveChannel,
  }));

  const dmChatsItems = dmChats.map((ch) => {
    const member = { status: ch.userStatus };

    return {
      icon: <StatusIcon member={member} />,
      link: `${url}/messages/${ch.slug}`,
      label: (
        <DmChatMenuItem
          channelSubId={ch.userSubId}
          label={ch.title}
          updateChannelSubRequest={updateChannelSubRequest}
        />
      ),
    };
  });

  return (
    <aside className="LeftSidebar">
      {currentUser && (
        <ProfileDropdown
          user={currentUser}
          workspaceTitle={currWorkspace.title}
          workspaces={workspaces}
          currChatSlug={currChatSlug}
        />
      )}
      <SidebarMenu menuFor="quicklinks" menuItems={quickLinksList} />
      <SidebarMenu menuFor="chats" menuItems={channelsItems}>
        <Button unStyled buttonFor="chats" onClick={() => modalOpen('MODAL_CHATS')}>
          Channels
        </Button>
        <Button unStyled buttonFor="widget" onClick={() => modalOpen('MODAL_CHAT')}>
          <FontAwesomeIcon icon={['fas', 'plus-circle']} />
        </Button>
      </SidebarMenu>
      <SidebarMenu menuFor="dmChats" widgetTitle="Direct Messages" menuItems={dmChatsItems} />
    </aside>
  );
};

export default LeftSidebar;
