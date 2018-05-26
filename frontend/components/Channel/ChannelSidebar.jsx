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
    return (
      <aside className="sidebar sidebar__channel">
        <UsersMenu
          workspaceSlug={this.props.workspaceSlug}
          channelSlug={this.props.channelSlug}
          userSlug={this.props.userSlug}
          workspaces={this.props.workspaces}
          modalOpen={this.props.modalOpen}
          modalClose={this.props.modalClose}
          openRightSidebar={this.props.openRightSidebar}
        />
        
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