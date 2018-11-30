import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserPreview from './UserPreview';
import StatusIcon from './StatusIcon';
import Button from './Button';
import Menu from './Menu';
import Dropdown from './Dropdown';

const LeftSidebarMenus = ({
  subbedChannels,
  dmChannels,
  hasUnreadChannels,
  chatPath,
  user,
  workspaces,
  hasUnreadConvos,
  workspaceTitle,
  match: { url },
  modalOpen,
  pushHistory,
  unsubChannel,
}) => {
  const isActive = (match, location) => (
    match && location.pathname.includes(`messages/${chatPath}`)
  );

  const ddMenuItems = [
    {
      label: <UserPreview user={user} avatarSize="40" hasNoStatus alignCenter />,
      altClassName: 'user-head',
    },
    {
      label: 'Home',
      link: '/',
      exact: true,
      hasNoDrawer: true,
    },
    { label: 'Profile & Account', link: `${url}/team/${user.slug}`, hasNoDrawer: true },
    { label: 'Switch Workspace', altClassName: 'switch-workspace' },
  ];

  workspaces.forEach(({ title: label, slug }) => {
    ddMenuItems.push({ label, link: `/${slug}`, hasNoDrawer: true });
  });

  const quickLinksList = [
    {
      icon: <FontAwesomeIcon icon="align-left" fixedWidth />,
      label: 'All Unreads',
      onClick: () => pushHistory('unreads'),
      isItemActive: chatPath === 'unreads',
      modifierClassName: hasUnreadChannels ? 'unread' : null,
    },
    {
      icon: <FontAwesomeIcon icon={['far', 'comment']} fixedWidth />,
      label: 'All Threads',
      onClick: () => pushHistory('threads'),
      isItemActive: chatPath === 'threads',
      modifierClassName: hasUnreadConvos ? 'unread' : null,
    },
  ];

  const channelsItems = subbedChannels.map(ch => ({
    icon: <FontAwesomeIcon icon="hashtag" size="sm" fixedWidth />,
    label: ch.title,
    link: `${url}/messages/${ch.slug}`,
    modifierClassName: ch.hasUnreads ? 'unread' : null,
    isActive,
  }));

  const dmChatsItems = dmChannels.map(({ status, ...ch }) => ({
    icon: <StatusIcon member={{ status }} />,
    link: `${url}/messages/${ch.slug}`,
    modifierClassName: ch.hasUnreads ? 'unread' : null,
    label: (
      <Fragment>
        {ch.title}
        <Button id={ch.slug} unStyled onClick={unsubChannel}>
          <FontAwesomeIcon icon="times-circle" />
        </Button>
      </Fragment>
    ),
  }));

  const sidebarMenuItems = [
    {
      key: 'profile',
      component: Dropdown,
      items: ddMenuItems,
      props: {
        togglerText: (
          <Fragment>
            <div className="LeftSidebar__workspace">{workspaceTitle}</div>
            <div className="LeftSidebar__workspace-subhead">
              <StatusIcon member={user} size="sm" />
              <div className="LeftSidebar__username">{user.username}</div>
            </div>
          </Fragment>
        ),
      },
    },
    { key: 'quicklinks', component: Menu, items: quickLinksList },
    {
      key: 'chats',
      component: Menu,
      items: channelsItems,
      title: (
        <Fragment>
          <Button unStyled buttonFor="chats" onClick={() => modalOpen('MODAL_CHATS')}>
            Channels
          </Button>
          <Button unStyled buttonFor="widget" onClick={() => modalOpen('MODAL_CHAT')}>
            <FontAwesomeIcon icon={['fas', 'plus-circle']} />
          </Button>
        </Fragment>
      ),
    },
    {
      key: 'dm-chats',
      component: Menu,
      items: dmChatsItems,
      title: 'Direct Messages',
    }
  ];

  return (
    <div className="LeftSidebarMenus">
      {sidebarMenuItems.map(group => (
        <section key={group.key} className="LeftSidebarMenus__group">
          {group.title && (
            <header className="LeftSidebarMenus__group-head">{group.title}</header>
          )}
          <group.component menuFor={group.key} items={group.items} {...group.props} />
        </section>
      ))}
    </div>
  );
};

export default LeftSidebarMenus;
