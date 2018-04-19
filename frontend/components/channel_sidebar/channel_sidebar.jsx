import React from 'react';
import ChannelsMenuContainer from '../channels_menu/channels_menu_container';

class ChannelSidebar extends React.Component {
  render() {
    return (
      <aside className="sidebar sidebar__channel">
        <ChannelsMenuContainer />
      </aside>
    );
  }
}

export default ChannelSidebar;