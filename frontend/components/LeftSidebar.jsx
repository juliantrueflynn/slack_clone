import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import DmChatMenuItem from './DmChatMenuItem';
import ProfileDropdown from './ProfileDropdown';
import StatusIcon from './StatusIcon';
import SidebarMenu from './SidebarMenu';
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
  const chatsModalOpen = () => modalOpen('MODAL_CHATS');
  const chatModalOpen = () => modalOpen('MODAL_CHAT');

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

  const channelsItems = subbedChannels.map(item => ({
    icon: <FontAwesomeIcon className="Icon" icon={['fas', 'hashtag']} size="sm" />,
    label: item.title,
    link: `/${workspaceSlug}/messages/${item.slug}`,
    modifierClassName: item.hasUnreads ? 'unread' : null,
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
      <div className="SidebarMenu">
        {user && (
          <ProfileDropdown
            user={user}
            workspaceTitle={currWorkspace.title}
            workspaces={workspaces}
            currChatSlug={currChatSlug}
          />
        )}
      </div>
      <SidebarMenu menuFor="quicklinks" menuItems={quickLinksList} />
      <SidebarMenu menuFor="chats" menuItems={channelsItems}>
        <Button unStyled buttonFor="chats" onClick={chatsModalOpen}>
          Channels
        </Button>
        <Button unStyled buttonFor="widget" onClick={chatModalOpen}>
          <FontAwesomeIcon icon={['fas', 'plus-circle']} />
        </Button>
      </SidebarMenu>
      <SidebarMenu menuFor="dmChats" widgetTitle="Direct Messages" menuItems={dmChatsItems} />
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
