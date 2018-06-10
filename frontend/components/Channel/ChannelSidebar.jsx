import React from 'react';
import { NavLink } from 'react-router-dom';
import UsersMenu from '../UsersMenu';
import ChannelsMenuContainer from './ChannelsMenuContainer';
import PreferencesModal from '../PreferencesModal';
import './ChannelSidebar.css';

const ChannelSidebar = props => (
  <aside className="sidebar sidebar__channel">
    <UsersMenu
      workspaceSlug={props.workspaceSlug}
      channelSlug={props.channelSlug}
      userSlug={props.userSlug}
      workspaces={props.workspaces}
      modalOpen={props.modalOpen}
      modalClose={props.modalClose}
      openRightSidebar={props.openRightSidebar}
    />

    <PreferencesModal
      workspaceSlug={props.workspaceSlug}
      modalClose={props.modalClose}
      isModalOpen={props.isModalOpen}
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

export default ChannelSidebar;
