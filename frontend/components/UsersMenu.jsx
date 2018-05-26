import React from 'react';
import { NavLink } from 'react-router-dom';
import DropdownMenu from './Layout/DropdownMenu';

class UsersMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handleOpenSidebar = this.handleOpenSidebar.bind(this);
  }

  handleOpenSidebar() {
    this.props.openRightSidebar();
  }

  render() {
    const { workspaceSlug, workspaces, channelSlug, userSlug } = this.props;
  
    return (
      <DropdownMenu menuFor="user" togglerText={workspaceSlug}>
        <li>
          Set Status
        </li>
        <li>
          <NavLink
            to={`/${workspaceSlug}/${channelSlug}/team/${userSlug}`}
            onClick={this.handleOpenSidebar}
          >
            Profile & Account
          </NavLink>
        </li>
        <li>
          <button>Preferences</button>          
        </li>
        <li>
          Switch Workspace
        </li>

        {workspaces && workspaces.map(workspace => (
          <li key={workspace.slug}>
            {workspace.title}
          </li>
        ))}
      </DropdownMenu>
    );
  }
}

export default UsersMenu;