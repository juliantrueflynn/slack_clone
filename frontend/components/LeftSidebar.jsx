import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import DmChatMenuItem from './DmChatMenuItem';
import ChatsWidget from './ChatsWidget';
import ProfileDropdown from './ProfileDropdown';
import './LeftSidebar.css';

const LeftSidebar = ({
  hasUnreadChannels,
  hasUnreadThreads,
  subbedChannels,
  currentUser,
  members,
  currWorkspace,
  workspaces,
  modalOpen,
  dmChats,
  unsubbedChannels,
  updateChannelSubRequest,
  createChannelRequest,
  fetchChannelsRequest,
  currChatSlug,
  isDrawerOpen,
  drawerUrl,
  match: { url, params: { workspaceSlug } },
}) => {
  if (!currWorkspace) {
    return null;
  }

  const appendDrawerPath = (linkUrl) => {
    if (isDrawerOpen) {
      return linkUrl + drawerUrl;
    }

    return linkUrl;
  };

  const quickLinksList = [
    {
      icon: <FontAwesomeIcon className="Icon" icon={['fas', 'align-left']} />,
      label: 'All Unreads',
      link: appendDrawerPath(`${url}/unreads`),
      modifierClassName: hasUnreadChannels ? 'unread' : null,
    },
    {
      icon: <FontAwesomeIcon className="Icon" icon={['far', 'comment']} />,
      label: 'All Threads',
      link: appendDrawerPath(`${url}/threads`),
      modifierClassName: hasUnreadThreads ? 'unread' : null,
    },
  ];

  const dmChatsItems = dmChats.map((ch) => {
    const circleType = ch.userStatus === 'OFFLINE' ? 'far' : 'fas';
    const circleIcon = [circleType, 'circle'];
    const classNames = `Icon Icon__${ch.userStatus.toLowerCase()}`;

    return {
      icon: <FontAwesomeIcon icon={circleIcon} size="xs" className={classNames} />,
      link: appendDrawerPath(`${url}/messages/${ch.slug}`),
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
    <aside className="Sidebar Sidebar--left">
      <div className="SidebarWidget">
        <ProfileDropdown
          workspaceTitle={currWorkspace.title}
          workspaces={workspaces}
          user={members[currentUser.slug]}
          url={url}
          currChatSlug={currChatSlug}
          modalOpen={modalOpen}
        />
      </div>

      <div className="SidebarWidget SidebarWidth__quicklinks">
        <Menu items={quickLinksList} menuFor="quicklinks" />
      </div>

      <ChatsWidget
        modalOpen={modalOpen}
        subbedChannels={subbedChannels}
        unsubbedChannels={unsubbedChannels}
        workspaceSlug={workspaceSlug}
        workspaceId={currWorkspace.id}
        createChannelRequest={createChannelRequest}
        fetchChannelsRequest={fetchChannelsRequest}
        appendDrawerPath={appendDrawerPath}
      />

      <div className="SidebarWidget">
        <header className="SidebarWidget__header">
          <span className="SidebarWidget__title">
            Direct Messages
          </span>
        </header>

        <Menu menuFor="dmChats" items={dmChatsItems} />
      </div>
    </aside>
  );
};

export default LeftSidebar;
