import React from 'react';
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
        <UsersMenu workspaceSlug={this.props.workspaceSlug} />
        <ChannelsMenuContainer />
      </aside>
    );
  }
}

export default ChannelSidebar;