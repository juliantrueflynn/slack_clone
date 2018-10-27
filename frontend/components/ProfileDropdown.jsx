import React from 'react';
import { withRouter } from 'react-router-dom';
import UserPreview from './UserPreview';
import StatusIcon from './StatusIcon';
import Dropdown from './Dropdown';
import './ProfileDropdown.css';

const ProfileDropdown = ({
  match: { url },
  currChatSlug,
  user,
  workspaces,
  workspaceTitle,
}) => {
  let baseUrl = `${url}/`;
  if (currChatSlug === 'unreads' || currChatSlug === 'threads') {
    baseUrl += currChatSlug;
  } else {
    baseUrl += `messages/${currChatSlug}`;
  }

  const menuItems = [
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
    { label: 'Profile & Account', link: `${baseUrl}/team/${user.slug}`, hasNoDrawer: true },
    { label: 'Switch Workspace', altClassName: 'switch-workspace' },
  ];

  if (workspaces) {
    workspaces.forEach((workspace) => {
      menuItems.push({ label: workspace.title, link: `/${workspace.slug}`, hasNoDrawer: true });
    });
  }

  return (
    <Dropdown menuFor="profile" items={menuItems} unStyled style={{ textAlign: 'left' }}>
      <div className="Dropdown__workspace">
        {workspaceTitle}
      </div>
      <div className="Dropdown__subtitle">
        <div className="Dropdown__status">
          <StatusIcon member={user} />
        </div>
        <div className="Dropdown__title">
          {user.username}
        </div>
      </div>
    </Dropdown>
  );
};

export default withRouter(ProfileDropdown);
