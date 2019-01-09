import React from 'react';
import StatusIcon from './StatusIcon';
import DropdownModalTriggerContainer from './DropdownModalTriggerContainer';
import Menu from './Menu';
import UserPreview from './UserPreview';
import './ProfileDropdownTrigger.css';

const ProfileDropdownTrigger = ({
  user,
  workspaceTitle,
  workspaces,
  profileUrl,
}) => {
  const ddDefaults = [
    { label: <UserPreview user={user} avatarSize="40" hasNoStatus /> },
    {
      label: 'Home',
      link: '/',
      exact: true,
      hasNoDrawer: true,
    },
    { label: 'Profile & Account', link: profileUrl, hasNoDrawer: true },
    { key: 'switch-workspace', label: 'Switch Workspace' },
  ];
  const ddMenuItems = ddDefaults.concat(workspaces);

  return (
    <DropdownModalTriggerContainer
      dropdownType="DROPDOWN_PROFILE"
      dropdownChild={<Menu items={ddMenuItems} />}
    >
      <div className="ProfileDropdownTrigger__workspace">{workspaceTitle}</div>
      <div className="ProfileDropdownTrigger__user">
        <StatusIcon member={user} size="sm" />
        <div className="ProfileDropdownTrigger__username">{user.username}</div>
      </div>
    </DropdownModalTriggerContainer>
  );
};

export default ProfileDropdownTrigger;
