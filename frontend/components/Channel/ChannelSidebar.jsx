import React from 'react';
import { NavLink } from 'react-router-dom';
import UsersMenu from '../UsersMenu';
import ChannelsMenuContainer from './ChannelsMenuContainer';
import './ChannelSidebar.css';

class ChannelSidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { workspaceSlug, workspaces } = this.props;
  
    return (
      <aside className="sidebar sidebar__channel">
        <UsersMenu workspaceSlug={workspaceSlug} workspaces={workspaces} />
        
        <ul className="quicklinks">
          <li className="quicklinks__item quicklinks__threads">
            <NavLink to="/unreads" className="quicklinks__link">
              All Unreads
            </NavLink>
          </li>
          <li className="quicklinks__item quicklinks__unreads">
            <NavLink to="/threads" className="quicklinks__link">
              All Threads
            </NavLink>
          </li>
        </ul>

        <ChannelsMenuContainer />
      </aside>
    );
  }
}

export default ChannelSidebar;