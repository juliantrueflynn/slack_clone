import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from './Avatar';
import Dropdown from './Dropdown';
import './ProfileDropdown.css';

const ProfileDropdown = ({
  currChatSlug,
  url,
  user,
  workspaces,
  workspaceTitle,
}) => {
  const greetingLabel = (
    <div className="ProfileDropdown__greeting">
      <Avatar author={user} avatarFor="greeting" size="40" />
      <div className="ProfileDropdown__greeting-user">
        <div className="ProfileDropdown__greeting-name">
          {user.username}
        </div>
        <div className="ProfileDropdown__greeting-email">
          {user.email}
        </div>
      </div>
    </div>
  );

  let baseUrl = `${url}/`;
  if (currChatSlug === 'unreads' || currChatSlug === 'threads') {
    baseUrl += currChatSlug;
  } else {
    baseUrl += `messages/${currChatSlug}`;
  }

  const menuItems = [
    { label: greetingLabel, altClassName: 'user-head' },
    {
      label: 'Home',
      link: '/',
      exact: true,
      hasNoDrawer: true,
    },
    { label: 'Profile & Account', link: `${baseUrl}/team/${user.slug}`, hasNoDrawer: true },
    { label: 'Switch Workspace', altClassName: 'switch-workspace' },
  ];

  if (workspaces) {
    workspaces.forEach((workspace) => {
      menuItems.push({ label: workspace.title, link: `/${workspace.slug}` });
    });
  }

  const userStatus = user.status && user.status.toLowerCase();

  return (
    <Dropdown menuFor="profile" items={menuItems} unStyled style={{ textAlign: 'left' }}>
      <div className="Dropdown__workspace">
        {workspaceTitle}
      </div>
      <div className="Dropdown__subtitle">
        <div className={`Dropdown__status Dropdown__status--${userStatus}`}>
          <FontAwesomeIcon className="Icon" icon={['fas', 'circle']} size="xs" />
        </div>
        <div className="Dropdown__title">
          {user.username}
        </div>
      </div>
    </Dropdown>
  );
};

export default ProfileDropdown;
