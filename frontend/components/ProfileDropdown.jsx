import React from 'react';
import { withRouter } from 'react-router-dom';
import UserPreview from './UserPreview';
import Menu from './Menu';
import Button from './Button';
import StatusIcon from './StatusIcon';
import DropdownModalContainer from './DropdownModalContainer';
import './ProfileDropdown.css';

class ProfileDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.handleHomeHistoryPush = this.handleHomeHistoryPush.bind(this);
  }

  handleHomeHistoryPush() {
    const { history } = this.props;
    history.push('/');
  }

  handleDropdownClick(e) {
    const { openDropdown } = this.props;
    const { bottom: posY } = e.currentTarget.getBoundingClientRect();

    openDropdown('DROPDOWN_PROFILE', { posY });
  }

  render() {
    const {
      user,
      workspaceTitle,
      workspaces,
      profileUrl,
    } = this.props;

    const ddDefaults = [
      { label: <UserPreview user={user} avatarSize="40" hasNoStatus alignCenter /> },
      { label: 'Home', onClick: this.handleHomeHistoryPush },
      { label: 'Profile & Account', link: profileUrl, hasNoDrawer: true },
      { key: 'switch-workspace', label: 'Switch Workspace' },
    ];

    const ddMenuItems = ddDefaults.concat(workspaces);

    return (
      <div className="ProfileDropdown">
        <Button buttonFor="dropdown" unStyled onClick={this.handleDropdownClick}>
          <div className="ProfileDropdown__workspace">{workspaceTitle}</div>
          <div className="ProfileDropdown__user">
            <StatusIcon member={user} size="sm" />
            <div className="ProfileDropdown__username">{user.username}</div>
          </div>
        </Button>
        <DropdownModalContainer
          dropdownType="DROPDOWN_PROFILE"
          fixedLeftPos="10px"
          bemModifier="profile"
        >
          <Menu items={ddMenuItems} />
        </DropdownModalContainer>
      </div>
    );
  }
}

export default withRouter(ProfileDropdown);
