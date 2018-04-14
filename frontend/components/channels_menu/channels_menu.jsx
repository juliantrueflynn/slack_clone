import React from 'react';
import ChannelsMenuItem from './channels_menu_item';

class ChannelsMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { workspaceId, channels } = this.props;
    const menuItems = channels.map(channel =>
      <ChannelsMenuItem
        key={ channel.id }
        workspaceId={ workspaceId }
        channel={ channel } />
    );

    return (
      <div>
        <h4>Channels</h4>
        <ul>{ menuItems }</ul>
      </div>
    );
  }
}

export default ChannelsMenu;