import React from 'react';
import { NavLink } from 'react-router-dom';
import DropdownMenu from './Layout/DropdownMenu';

class UsersMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleModalOpenClick = this.handleModalOpenClick.bind(this);
  }

  handleModalOpenClick() {
    this.props.modalOpen();
  }

  render() {
    const { workspaces, ...props } = this.props;
    const { channelSlug, workspaceSlug, userSlug } = props;
    const urlForMemberSidebar = `/${workspaceSlug}/${channelSlug}/team/${userSlug}`;

    if (!workspaces) {
      return null;
    }

    return (
      <DropdownMenu menuFor="user" togglerText={workspaceSlug}>
        <li>
          Set Status
        </li>
        <li>
          <NavLink to={urlForMemberSidebar}>
            Profile & Account
          </NavLink>
        </li>
        <li>
          <button className="btn btn__nav" onClick={this.handleModalOpenClick}>
            Preferences
          </button>
        </li>
        <li>
          Switch Workspace
        </li>

        <NavLink to="/">Home</NavLink>

        {workspaces.map(workspace => (
          <li key={workspace.id}>
            <NavLink to={`/${workspace.slug}`}>
              {workspace.title}
            </NavLink>
          </li>
        ))}
      </DropdownMenu>
    );
  }
}

export default UsersMenu;
