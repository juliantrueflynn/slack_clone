import React from 'react';
import { NavLink } from 'react-router-dom';
import './ChannelsMenu.css';

const ChannelsMenu = ({ subbedChannels, workspaceSlug }) => (
  <ul className="menu menu__channels">
    {subbedChannels.map(channel => (
      <li key={channel.slug} className={`menu__item ${channel.hasUnreads ? 'menu-item--unread' : ''}`}>
        <NavLink
          className="menu__link"
          activeClassName="menu__link--active"
          to={`/${workspaceSlug}/${channel.slug}`}
        >
          &#x00023; {channel.title}
        </NavLink>
      </li>
    ))}
  </ul>
);

export default ChannelsMenu;
