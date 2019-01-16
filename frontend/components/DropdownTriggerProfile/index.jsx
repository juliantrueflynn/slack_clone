import React from 'react';
import StatusIcon from '../StatusIcon';
import DropdownTriggerContainer from '../../containers/DropdownTriggerContainer';
import Menu from '../Menu';
import UserPreview from '../UserPreview';
import './styles.css';

const DropdownTriggerProfile = ({
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
    <DropdownTriggerContainer
      dropdownType="DROPDOWN_PROFILE"
      dropdownChild={<Menu items={ddMenuItems} />}
    >
      <div className="DropdownTriggerProfile__workspace">{workspaceTitle}</div>
      <div className="DropdownTriggerProfile__user">
        <StatusIcon member={user} size="sm" />
        <div className="DropdownTriggerProfile__username">{user.username}</div>
      </div>
    </DropdownTriggerContainer>
  );
};

export default DropdownTriggerProfile;
