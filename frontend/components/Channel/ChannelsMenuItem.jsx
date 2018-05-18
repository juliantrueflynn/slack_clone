import React from 'react';
import { NavLink } from 'react-router-dom';
import './ChannelsMenuItem.css';

class ChannelsMenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { channel, workspaceSlug } = this.props;
    const channelUrl = `/${workspaceSlug}/${channel.slug}`;

    return (
      <li className="nav-item nav-item__channel">
        <NavLink
          className="nav-item__link"
          activeClassName="nav-item__link--active"
          to={channelUrl}
        >
          ID: #{channel.id} - Title: {channel.title}
        </NavLink>
      </li>
    );
  }
}

export default ChannelsMenuItem;