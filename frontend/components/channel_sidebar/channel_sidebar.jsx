import React from 'react';
import ChannelsMenuContainer from '../channels_menu/channels_menu_container';
import './channel_sidebar.css';

class ChannelSidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <aside className="sidebar sidebar__channel">
        <ChannelsMenuContainer />
      </aside>
    );
  }
}

export default ChannelSidebar;