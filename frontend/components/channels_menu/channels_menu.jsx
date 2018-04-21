import React from 'react';
import ChannelsMenuItem from './channels_menu_item';

class ChannelsMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handleModalOpen = this.handleModalOpen.bind(this);
  }

  handleModalOpen(event) {
    event.preventDefault();
    this.props.modalOpen();
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
        <header>
          <span>Channels</span>
          <button onClick={ this.handleModalOpen }>+</button>
        </header>
        <div>
          <ul>{ menuItems }</ul>
        </div>
      </div>
    );
  }
}

export default ChannelsMenu;