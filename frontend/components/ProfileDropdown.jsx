import React from 'react';
import UserPreview from './UserPreview';
import DropdownModal from './DropdownModal';
import Menu from './Menu';
import Button from './Button';
import StatusIcon from './StatusIcon';
import './ProfileDropdown.css';

class ProfileDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
  }

  handleDropdownClick(e) {
    const { openDropdown } = this.props;
    const { bottom: posY } = e.currentTarget.getBoundingClientRect();

    openDropdown('DROPDOWN_PROFILE', { posY });
  }

  render() {
    const {
      user,
      workspace,
      workspaces,
      chatPath,
      closeDropdown,
      dropdownProps,
      isDdOpen,
      url,
    } = this.props;

    const isChannel = chatPath !== 'unreads' && chatPath;
    const chatPathUrl = isChannel ? `${url}/messages/${chatPath}` : `${url}/${chatPath}`;

    const ddDefaults = [
      { label: <UserPreview user={user} avatarSize="40" hasNoStatus alignCenter /> },
      {
        label: 'Home',
        link: '/',
        exact: true,
        hasNoDrawer: true,
      },
      { label: 'Profile & Account', link: `${chatPathUrl}/team/${user.slug}`, hasNoDrawer: true },
      { key: 'switch-workspace', label: 'Switch Workspace' },
    ];

    const userItems = ddDefaults.concat(workspaces.map(item => ({
      link: `/${item.slug}`,
      label: item.title,
      hasNoDrawer: true,
    })));

    return (
      <div className="ProfileDropdown">
        <Button buttonFor="dropdown" unStyled onClick={this.handleDropdownClick}>
          <div className="ProfileDropdown__workspace">{workspace.title}</div>
          <div className="ProfileDropdown__user">
            <StatusIcon member={user} size="sm" />
            <div className="ProfileDropdown__username">{user.username}</div>
          </div>
        </Button>
        {isDdOpen && (
          <DropdownModal
            coordinates={dropdownProps}
            fixedLeftPos="10px"
            bemModifier="profile"
            close={closeDropdown}
          >
            <Menu items={userItems} />
          </DropdownModal>
        )}
      </div>
    );
  }
}

export default ProfileDropdown;
