import React from 'react';
import ChannelsMenuContainer from './ChannelsMenuContainer';
import './ChannelSidebar.css';

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