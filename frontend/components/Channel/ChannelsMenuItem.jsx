import React from 'react';
import { NavLink } from 'react-router-dom';
import './ChannelsMenuItem.css';

const ChannelsMenuItem = ({ channel, workspaceSlug }) => (
  <li className={`nav-item nav-item__channel ${channel.hasUnreads ? 'nav-item--unread' : ''}`}>
    <NavLink
      className="nav-item__link"
      activeClassName="nav-item__link--active"
      to={`/${workspaceSlug}/${channel.slug}`}
    >
      {channel.title}
    </NavLink>
  </li>
);

export default ChannelsMenuItem;
