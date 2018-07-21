import React from 'react';
import { NavLink } from 'react-router-dom';
import Dropdown from './Layout/Dropdown';

class UsersMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleModalOpenClick = this.handleModalOpenClick.bind(this);
  }

  handleModalOpenClick() {
    this.props.modalOpen('SETTINGS');
  }

  render() {
    const { workspaces, ...props } = this.props;
    const { channelSlug, workspaceSlug, userSlug } = props;
    const urlForMemberSidebar = `/${workspaceSlug}/${channelSlug}/team/${userSlug}`;

    if (!workspaces) {
      return null;
    }

    return (
      <Dropdown togglerText={workspaceSlug}>
        <ul className="menu menu__user">
          <li className="menu__item">
            <NavLink className="menu__link" to="/">Home</NavLink>
          </li>
          <li className="menu__item">
            <span className="menu__text">
              Set Status
            </span>
          </li>
          <li className="menu__item">
            <NavLink activeClassName="menu__link--active" className="menu__link" to={urlForMemberSidebar}>
              Profile & Account
            </NavLink>
          </li>
          <li className="menu__item">
            <button className="menu__link" onClick={this.handleModalOpenClick}>
              Preferences
            </button>
          </li>
        </ul>

        <div className="users-menu__workspaces">
          <span className="menu__divider-title">Switch Workspace</span>
          <ul className="menu menu__workspaces">
            {workspaces.map(workspace => (
              <li className="menu__item" key={workspace.id}>
                <NavLink activeClassName="menu__link--active" className="menu__link" to={`/${workspace.slug}`}>
                  {workspace.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </Dropdown>
    );
  }
}

export default UsersMenu;
