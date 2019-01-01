import React from 'react';
import Button from './Button';
import StatusIcon from './StatusIcon';
import './ProfileDropdownTrigger.css';

class ProfileDropdownTrigger extends React.Component {
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
    const { user, workspaceTitle, isDdOpen } = this.props;

    return (
      <div className="ProfileDropdownTrigger">
        <Button
          buttonFor="dropdown"
          unStyled
          isActive={isDdOpen}
          onClick={this.handleDropdownClick}
        >
          <div className="ProfileDropdownTrigger__workspace">{workspaceTitle}</div>
          <div className="ProfileDropdownTrigger__user">
            <StatusIcon member={user} size="sm" />
            <div className="ProfileDropdownTrigger__username">{user.username}</div>
          </div>
        </Button>
      </div>
    );
  }
}

export default ProfileDropdownTrigger;
