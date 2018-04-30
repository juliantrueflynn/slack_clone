import React from 'react';
import MessageThreadContainer from '../message_thread/message_thread_container';

class ChannelRightSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
  }

  handleCloseSidebar() {
    this.props.closeThread();
  }

  render() {
    const { thread, isRightSidebarOpen } = this.props;

    if (!isRightSidebarOpen) return null;
  
    return (
      <aside className="channel-right-sidebar">
        <header className="channel-right-sidebar__header">
          <span className="h4">Thread</span>
          <button onClick={ this.handleCloseSidebar }>X</button>
        </header>
        <MessageThreadContainer />
      </aside>
    );
  }
}

export default ChannelRightSidebar;