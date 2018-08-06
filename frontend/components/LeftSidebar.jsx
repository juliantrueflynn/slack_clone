import React from 'react';
import ChatModal from './ChatModal';
import PreferencesModal from './PreferencesModal';
import Dropdown from './Dropdown';
import Menu from './Menu';
import Button from './Button';
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
  createChannelRequest,
}) => {
  const handleModalOpen = () => modalOpen('MODAL_CHAT');
  const quickLinksList = [
    { label: 'All Unreads', link: `/${workspaceSlug}/unreads` },
    { label: 'All Threads', link: `/${workspaceSlug}/threads` },
  ];
  const chatList = subbedChannels.map(item => ({
    label: item.title,
    link: `/${workspaceSlug}/${item.slug}`,
  }));
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
    const subsWithoutCurrUser = ch.memberSlugs.filter(slug => slug !== currentUser.slug);
    const usernames = subsWithoutCurrUser.map(slug => members[slug].username);
    return {
      link: `/${workspaceSlug}/${ch.slug}`,
      label: usernames.join(', '),
    };
  });

  return (
    <aside className="Sidebar Sidebar--left">
      <div className="SidebarWidget">
        <Dropdown togglerText={workspaceSlug} menuFor="user" items={profileDdMenu} />
      </div>

      <div className="SidebarWidget">
        <Menu items={quickLinksList} menuFor="quicklinks" />
      </div>

      <div className="SidebarWidget">
        <header className="SidebarWidget__header">
          <span className="SidebarWidget__title">
            Channels
          </span>
          <Button className="Btn__widget" onClick={handleModalOpen}>
            +
          </Button>
        </header>
        {subbedChannels && (
          <Menu items={chatList} />
        )}
      </div>

      <div className="SidebarWidget">
        <header className="SidebarWidget__header">
          <span className="SidebarWidget__title">
            Direct Messages
          </span>
          <Button className="Btn__widget" onClick={handleModalOpen}>
            +
          </Button>
        </header>

        <Menu menuFor="dmChats" items={dmChatsItems} />
      </div>

      <ChatModal
        workspaceId={workspaceId}
        createChannelRequest={createChannelRequest}
      />

      <PreferencesModal workspaceSlug={workspaceSlug} />
    </aside>
  );
};

export default LeftSidebar;
