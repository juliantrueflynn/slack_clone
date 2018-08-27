import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PreferencesModal from './PreferencesModal';
import Dropdown from './Dropdown';
import Menu from './Menu';
import DmChatMenuItem from './DmChatMenuItem';
import ChatsWidget from './ChatsWidget';
import './LeftSidebar.css';

const LeftSidebar = ({
  subbedChannels,
  workspaceSlug,
  channelSlug,
  userSlug,
  currentUser,
  members,
  workspaces,
  modalOpen,
  dmChats,
  workspaceId,
  unsubbedChannels,
  updateChannelSubRequest,
  createChannelRequest,
  fetchChannelsRequest,
}) => {
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
  const profileDdMenu = [
    { label: 'Home', link: '/', exact: true },
    { label: 'Set Status' },
    { label: 'Profile & Account', link: `/${workspaceSlug}/${channelSlug}/team/${userSlug}` },
    { label: 'Preferences', onClick: () => modalOpen('SETTINGS') },
    { label: 'Switch Workspace' },
  ];

  if (workspaces) {
    workspaces.forEach((workspace) => {
      profileDdMenu.push({ label: workspace.title, link: `/${workspace.slug}` });
    });
  }

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
      icon: (<FontAwesomeIcon icon={circleIcon} size="xs" className={iconClassName} />),
      link: `/${workspaceSlug}/${ch.slug}`,
      label: (
        <DmChatMenuItem
          channelId={ch.id}
          label={usernames}
          updateChannelSubRequest={updateChannelSubRequest}
        />
      ),
    };
  });

  const userStatus = currentUser.status && currentUser.status.toLowerCase();

  return (
    <aside className="Sidebar Sidebar--left">
      <div className="SidebarWidget">
        <Dropdown menuFor="user" items={profileDdMenu}>
          <div className="Dropdown__workspace">
            {workspaceSlug}
          </div>
          <div className="Dropdown__subtitle">
            <div className={`Dropdown__status Dropdown__status--${userStatus}`}>
              <FontAwesomeIcon className="Icon" icon={['fas', 'circle']} size="xs" />
            </div>
            <div className="Dropdown__title">
              {currentUser.username}
            </div>
          </div>
        </Dropdown>
      </div>

      <div className="SidebarWidget SidebarWidth__quicklinks">
        <Menu items={quickLinksList} menuFor="quicklinks" />
      </div>

      <ChatsWidget
        modalOpen={modalOpen}
        subbedChannels={subbedChannels}
        unsubbedChannels={unsubbedChannels}
        workspaceSlug={workspaceSlug}
        workspaceId={workspaceId}
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
