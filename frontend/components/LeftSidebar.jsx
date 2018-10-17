import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import DmChatMenuItem from './DmChatMenuItem';
import ChatsWidget from './ChatsWidget';
import ProfileDropdown from './ProfileDropdown';
import StatusIcon from './StatusIcon';
import './LeftSidebar.css';

const LeftSidebar = ({
  hasUnreadThreads,
  channels,
  currentUser,
  members,
  currWorkspace,
  workspaces,
  modalOpen,
  dmChats,
  updateChannelSubRequest,
  fetchChannelsRequest,
  currChatSlug,
  match: { url, params: { workspaceSlug } },
}) => {
  if (!currWorkspace) {
    return null;
  }

  const hasUnreadChannels = !!channels.filter(ch => ch.isSub && ch.hasUnreads).length;

  const quickLinksList = [
    {
      icon: <FontAwesomeIcon className="Icon" icon={['fas', 'align-left']} />,
      label: 'All Unreads',
      link: `${url}/unreads`,
      modifierClassName: hasUnreadChannels ? 'unread' : null,
    },
    {
      icon: <FontAwesomeIcon className="Icon" icon={['far', 'comment']} />,
      label: 'All Threads',
      link: `${url}/threads`,
      modifierClassName: hasUnreadThreads ? 'unread' : null,
    },
  ];

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
      <div className="SidebarWidget">
        {members[currentUser.slug] && (
          <ProfileDropdown
            workspaceTitle={currWorkspace.title}
            workspaces={workspaces}
            user={members[currentUser.slug]}
            url={url}
            currChatSlug={currChatSlug}
          />
        )}
      </div>

      <div className="SidebarWidget SidebarWidth__quicklinks">
        <Menu items={quickLinksList} menuFor="quicklinks" />
      </div>

      <ChatsWidget
        modalOpen={modalOpen}
        channels={channels}
        workspaceSlug={workspaceSlug}
        workspaceId={currWorkspace.id}
        fetchChannelsRequest={fetchChannelsRequest}
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
