import React from 'react';
import ChannelsMenuItem from './ChannelsMenuItem';

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
    const { channels, workspaceSlug } = this.props;
  
    return (
      <div>
        <header>
          <span>Channels</span>
          <button onClick={this.handleModalOpen}>+</button>
        </header>
        <div>
          <ul>
            {channels.map(channel => (
              <ChannelsMenuItem
                key={channel.slug}
                channel={channel}
                workspaceSlug={workspaceSlug}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ChannelsMenu;