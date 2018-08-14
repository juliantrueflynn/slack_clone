import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    {
      icon: <FontAwesomeIcon icon={['fas', 'align-left']} />,
      label: 'All Unreads',
      link: `/${workspaceSlug}/unreads`,
    },
    {
      icon: <FontAwesomeIcon icon={['far', 'comment']} />,
      label: 'All Threads',
      link: `/${workspaceSlug}/threads`,
    },
  ];
  const chatList = subbedChannels.map(item => ({
    icon: <FontAwesomeIcon icon={['fas', 'hashtag']} />,
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

    const dmUser = members[subsWithoutCurrUser[0]];
    const dmUserStatus = dmUser && dmUser.status.toLowerCase();
    const circleType = dmUserStatus === 'offline' ? 'far' : 'fas';

    return {
      icon: (
        <FontAwesomeIcon
          icon={[circleType, 'circle']}
          size="xs"
          className={`Icon Icon__status--${dmUserStatus}`}
        />
      ),
      link: `/${workspaceSlug}/${ch.slug}`,
      label: usernames.join(', '),
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
              <FontAwesomeIcon icon={['fas', 'circle']} size="xs" />
            </div>
            <div className="Dropdown__title">
              {currentUser.username}
            </div>
          </div>
        </Dropdown>
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
            <FontAwesomeIcon icon={['fas', 'plus-circle']} />
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
