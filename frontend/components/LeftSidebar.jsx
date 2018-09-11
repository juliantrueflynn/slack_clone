import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PreferencesModal from './PreferencesModal';
import Menu from './Menu';
import DmChatMenuItem from './DmChatMenuItem';
import ChatsWidget from './ChatsWidget';
import ProfileDropdown from './ProfileDropdown';
import './LeftSidebar.css';

const LeftSidebar = ({
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
  match: { url, params: { workspaceSlug } },
}) => {
  if (!currWorkspace) return null;

  const quickLinksList = [
    {
      icon: <FontAwesomeIcon className="Icon" icon={['fas', 'align-left']} />,
      label: 'All Unreads',
      link: `/${workspaceSlug}/unreads`,
    },
    {
      icon: <FontAwesomeIcon className="Icon" icon={['far', 'comment']} />,
      label: 'All Threads',
      link: `/${workspaceSlug}/threads`,
    },
  ];

  const dmChatsItems = dmChats && dmChats.map((ch) => {
    const subsWithoutCurrUser = ch.members.filter(slug => slug !== currentUser.slug);
    const usernames = subsWithoutCurrUser.map(slug => members[slug].username);

    if (!usernames) return null;

    const dmUser = members[subsWithoutCurrUser[0]];
    const dmUserStatus = dmUser && dmUser.status.toLowerCase();
    const circleType = dmUserStatus === 'offline' ? 'far' : 'fas';
    const circleIcon = [circleType, 'circle'];
    const iconClassName = `Icon Icon__status--${dmUserStatus}`;

    return {
      icon: <FontAwesomeIcon icon={circleIcon} size="xs" className={iconClassName} />,
      link: `/${workspaceSlug}/messages/${ch.slug}`,
      label: (
        <DmChatMenuItem
          channelId={ch.id}
          label={usernames}
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
      />

      <div className="SidebarWidget">
        <header className="SidebarWidget__header">
          <span className="SidebarWidget__title">
            Direct Messages
          </span>
        </header>

        <Menu menuFor="dmChats" items={dmChatsItems} />
      </div>

      <PreferencesModal workspaceSlug={workspaceSlug} />
    </aside>
  );
};

export default LeftSidebar;
