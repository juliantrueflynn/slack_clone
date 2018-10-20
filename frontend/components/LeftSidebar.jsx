import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import DmChatMenuItem from './DmChatMenuItem';
import ChatsWidget from './ChatsWidget';
import ProfileDropdown from './ProfileDropdown';
import StatusIcon from './StatusIcon';
import ChatModal from './ChatModal';
import ChatsModal from './ChatsModal';
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

  const user = members[currentUser.slug];
  const hasUnreadChannels = !!channels.filter(ch => ch.isSub && ch.hasUnreads).length;
  const chats = channels.sort((a, b) => a.title && b.title && a.title.localeCompare(b.title));
  const subbedChannels = chats.filter(ch => ch.isSub);
  const unsubbedChannels = chats.filter(ch => !ch.isSub);

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
        {user && (
          <ProfileDropdown
            user={user}
            workspaceTitle={currWorkspace.title}
            workspaces={workspaces}
            currChatSlug={currChatSlug}
          />
        )}
      </div>
      <div className="SidebarWidget SidebarWidth__quicklinks">
        <Menu items={quickLinksList} menuFor="quicklinks" />
      </div>
      <ChatsWidget
        modalOpen={modalOpen}
        subbedChannels={subbedChannels}
        workspaceSlug={workspaceSlug}
      />
      <div className="SidebarWidget">
        <header className="SidebarWidget__header">
          <div className="SidebarWidget__title">
            Direct Messages
          </div>
        </header>
        <Menu menuFor="dmChats" items={dmChatsItems} />
      </div>
      <ChatsModal
        workspaceSlug={workspaceSlug}
        unsubbedChannels={unsubbedChannels}
        fetchChannelsRequest={fetchChannelsRequest}
      />
      <ChatModal workspaceId={currWorkspace.id} />
    </aside>
  );
};

export default LeftSidebar;
