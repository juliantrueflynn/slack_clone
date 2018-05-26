import React from 'react';
import { NavLink } from 'react-router-dom';
import DropdownMenu from './Layout/DropdownMenu';

class UsersMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { workspaceSlug, workspaces } = this.props;
  
    return (
      <DropdownMenu menuFor="user" togglerText={workspaceSlug}>
        <li>
          Set Status
        </li>
        <li>
          <NavLink to="/account/settings">Profile & Account</NavLink>
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