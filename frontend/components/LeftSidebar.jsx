import React from 'react';
import { NavLink } from 'react-router-dom';
import UsersMenu from './UsersMenu';
import ChannelsMenuContainer from './Channel/ChannelsMenuContainer';
import PreferencesModal from './PreferencesModal';
import './LeftSidebar.css';

const LeftSidebar = props => (
  <aside className="sidebar sidebar__left">
    <UsersMenu
      workspaceSlug={props.workspaceSlug}
      channelSlug={props.channelSlug}
      userSlug={props.userSlug}
      workspaces={props.workspaces}
      modalOpen={props.modalOpen}
      modalClose={props.modalClose}
    />

    <PreferencesModal
      workspaceSlug={props.workspaceSlug}
      modalClose={props.modalClose}
      isModalOpen={props.isModalOpen}
    />

    <ul className="quicklinks">
      <li className="quicklinks__item quicklinks__unreads">
        <NavLink to={`/${props.workspaceSlug}/unreads`} className="quicklinks__link">
          All Unreads
        </NavLink>
      </li>
      <li className="quicklinks__item quicklinks__threads">
        <NavLink to={`/${props.workspaceSlug}/threads`} className="quicklinks__link">
          All Threads
        </NavLink>
      </li>
    </ul>

    <ChannelsMenuContainer />
  </aside>
);

export default LeftSidebar;
