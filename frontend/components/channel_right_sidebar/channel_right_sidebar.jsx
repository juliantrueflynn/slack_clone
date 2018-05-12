import React from 'react';
import MessageThread from '../message_thread/message_thread';

class ChannelRightSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
  }

  handleCloseSidebar() {
    this.props.closeRightSidebar();
  }

  render() {
    const {
      isRightSidebarOpen, rightSidebar, message, threadEntries
    } = this.props;

    if (!isRightSidebarOpen) return null;
    return (
      <aside className="channel-right-sidebar">
        <header className="channel-right-sidebar__header">
          <span className="h4">{ rightSidebar.sidebarProps.title }</span>
          <button onClick={ this.handleCloseSidebar }>X</button>
        </header>
        <MessageThread message={ message } threadEntries={ threadEntries } />
      </aside>
    );
  }
}

export default ChannelRightSidebar;