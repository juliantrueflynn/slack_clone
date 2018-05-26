import React from 'react';
import { NavLink } from 'react-router-dom';
import DropdownMenu from './Layout/DropdownMenu';

class UsersMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DropdownMenu menuFor="user" togglerText={this.props.workspaceSlug}>
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
      </DropdownMenu>
    );
  }
}

export default UsersMenu;