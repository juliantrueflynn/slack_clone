import React from 'react';
import ChannelsMenuItem from './channels_menu_item';

class ChannelsMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestChannels();
  }

  render() {
    const { channels } = this.props;
    const menuItems = channels.map(channel =>
      <ChannelsMenuItem key={ channel.id } channel={ channel } />
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